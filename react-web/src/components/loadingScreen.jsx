export default function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex-col">
            <div className="relative">
                <div className="inset-0 flex items-center justify-center font-bold text-lg">
                    <p className="mt-6 text-xl font-semibold animate-pulse">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
}