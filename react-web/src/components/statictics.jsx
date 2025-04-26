import { FaBox, FaUsers } from 'react-icons/fa';

const Statictics = ({ stats, loading }) => {
    return (
        <div className="grid grid-cols-1 gap-4 mb-2">
            {loading ? (
                // Ghost loading UI
                <>
                    <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 animate-pulse">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                            <div>
                                <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 animate-pulse">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                            <div>
                                <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-4 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                <FaBox className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Total Products</h2>
                                <p className="text-3xl font-bold text-blue-600">{Number(stats?.totalProducts) < 10 ? `0${stats.totalProducts}` : stats.totalProducts || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-4 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                <FaUsers className="text-green-500 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Total Users</h2>
                                <p className="text-3xl font-bold text-green-600">{Number(stats.totalUsers) < 10 ? `0${stats.totalUsers}` : stats.totalUsers || 0}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default Statictics;