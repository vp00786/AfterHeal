import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Clock, AlertTriangle, Pill, Activity } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

// Mock Data for Patient Checklist
const INITIAL_TASKS = [
    {
        id: "t1",
        name: "Morning Medication (Amoxicillin)",
        time: "08:00 AM",
        status: "completed",
        priority: "critical",
        type: "medication"
    },
    {
        id: "t2",
        name: "Blood Pressure Check",
        time: "10:00 AM",
        status: "pending",
        priority: "critical",
        type: "vitals"
    },
    {
        id: "t3",
        name: "Afternoon Walk (15 mins)",
        time: "02:00 PM",
        status: "pending",
        priority: "routine",
        type: "exercise"
    },
    {
        id: "t4",
        name: "Evening Pain Meds",
        time: "09:00 PM",
        status: "pending",
        priority: "critical",
        type: "medication"
    },
    {
        id: "t5",
        name: "Hydration Check (Yesterday)",
        time: "Yesterday",
        status: "missed",
        priority: "routine",
        type: "habit"
    }
];

const PatientChecklist = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                // Toggle between completed and pending (if not missed)
                if (task.status === 'missed') return task;
                return {
                    ...task,
                    status: task.status === 'completed' ? 'pending' : 'completed'
                };
            }
            return task;
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'border-emerald-200 bg-emerald-50';
            case 'missed': return 'border-red-200 bg-red-50';
            default: return 'border-gray-100 bg-white';
        }
    };

    const getIcon = (type) => {
        if (type === 'medication') return <Pill className="h-5 w-5" />;
        return <Activity className="h-5 w-5" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans pb-24">
            <header className="flex items-center mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 mr-4 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Today's Checklist</h1>
                    <p className="text-gray-500 text-sm">Stay on track with your recovery.</p>
                </div>
            </header>

            <div className="space-y-4 max-w-lg mx-auto">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={clsx(
                            "relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 shadow-sm",
                            getStatusColor(task.status),
                            task.status === 'pending' && "hover:shadow-md border-l-4 border-l-amber-400"
                        )}
                    >
                        {/* Priority Banner */}
                        {task.priority === 'critical' && task.status !== 'completed' && (
                            <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                                Critical
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            {/* Checkbox / Action */}
                            <button
                                onClick={() => handleToggleComplete(task.id)}
                                disabled={task.status === 'missed'}
                                className={clsx(
                                    "flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center transition-all",
                                    task.status === 'completed' ? "bg-emerald-500 text-white shadow-emerald-200" :
                                        task.status === 'missed' ? "bg-red-100 text-red-400 cursor-not-allowed" :
                                            "bg-white border-2 border-gray-200 text-gray-300 hover:border-emerald-400 hover:text-emerald-400"
                                )}
                            >
                                {task.status === 'completed' ? <CheckCircle className="h-8 w-8" /> :
                                    task.status === 'missed' ? <AlertTriangle className="h-6 w-6" /> :
                                        <Circle className="h-8 w-8" />}
                            </button>

                            <div className="flex-1">
                                <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {task.time}
                                </div>
                                <h3 className={clsx(
                                    "text-lg font-bold leading-tight",
                                    task.status === 'completed' ? "text-gray-500 line-through decoration-emerald-500/50" : "text-gray-900",
                                    task.status === 'missed' && "text-red-700"
                                )}>
                                    {task.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={clsx(
                                        "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                                        task.type === 'medication' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                    )}>
                                        {getIcon(task.type)} {task.type}
                                    </span>
                                    <span className={clsx(
                                        "text-xs font-bold capitalize px-2 py-0.5 rounded-full",
                                        task.status === 'completed' ? "bg-emerald-100 text-emerald-700" :
                                            task.status === 'missed' ? "bg-red-100 text-red-700" :
                                                "bg-amber-100 text-amber-700"
                                    )}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {tasks.every(t => t.status === 'completed') && (
                    <div className="mt-8 p-6 text-center bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-500/20">
                        <CheckCircle className="h-12 w-12 mx-auto mb-2 text-emerald-100" />
                        <h2 className="text-2xl font-bold">All Tasks Complete!</h2>
                        <p className="text-emerald-100">Great job today. Keep it up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientChecklist;
