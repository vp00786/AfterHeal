const supabase = require('../config/supabaseClient');

// @desc    Get All Alerts (Role based)
// @route   GET /api/alerts
// @access  Private
const getAlerts = async (req, res) => {
    try {
        let query = supabase.from('alerts').select('*, task:tasks(*)').eq('recipient', req.user._id).order('createdAt', { ascending: false });

        const { data: alerts, error } = await query;
        if (error) throw error;

        res.json(alerts);
    } catch (error) {
        console.error('Get Alerts Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mark Alert as Read
// @route   PUT /api/alerts/:id/read
// @access  Private
const markAlertRead = async (req, res) => {
    try {
        const { data: alert, error: fetchError } = await supabase
            .from('alerts')
            .select('*')
            .eq('_id', req.params.id)
            .single();

        if (fetchError || !alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        if (alert.recipient !== req.user._id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { data: updatedAlert, error: updateError } = await supabase
            .from('alerts')
            .update({ isRead: true })
            .eq('_id', req.params.id)
            .select()
            .single();

        if (updateError) throw updateError;

        res.json(updatedAlert);
    } catch (error) {
        console.error('Complete Alert Error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAlerts, markAlertRead };
