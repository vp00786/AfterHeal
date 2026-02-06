const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            // Supabase User Lookup
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('_id', decoded.id)
                .single();

            if (error || !user) {
                console.error('Auth Middleware Error:', error ? error.message : 'User not found');
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user;
            delete req.user.password;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user ? req.user.role : 'unknown'} is not authorized to access this route`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
