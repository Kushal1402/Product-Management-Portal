import { useEffect, useState } from "react";

import { getLatestProducts, getStatistics } from "../actions/adminAction";
import LatestProductsTable from "../components/latestProductsTable";
import Statictics from "../components/statictics";

const Dashboard = () => {

    const [products, setProducts] = useState([]);

    const [stats, setStats] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching dashboard data...");
        const fetchData = async () => {
            try {
                const [productsResponse, statisticsResponse] = await Promise.all([
                    getLatestProducts(),
                    getStatistics()
                ]);

                // You can set state variables here if needed
                setProducts(productsResponse.result);
                setStats(statisticsResponse.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-start text-gray-800">Dashboard</h1>
            
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-9">
                    <div className="bg-white rounded-lg shadow px-0 py-4">
                        {/* <h2 className="text-lg font-semibold mb-3 text-gray-700">Latest Products</h2> */}
                        <LatestProductsTable products={products} loading={loading} totalProducts={stats.totalProducts || 0} />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-3">
                    <div className="rounded-lg shadow p-4">
                        {/* <h2 className="text-lg font-semibold mb-3 text-gray-700">Statistics</h2> */}
                        <Statictics stats={stats} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;