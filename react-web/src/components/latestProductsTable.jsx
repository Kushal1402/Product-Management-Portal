import { IoEye } from "react-icons/io5";

const LatestProductsTable = ({ products, loading, totalProducts }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 px-4">Latest 10 Products</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-10">No.</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Product Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider w-100">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-45">User Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-45">No. of Variant(s)</th>
                            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 w-25">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            [...Array(5)].map((_, index) => (
                                <tr key={`skeleton-${index}`} className="animate-pulse">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                </tr>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.productName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 w-100">
                                        {product.productDescription || 'No description'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.userId.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {(product.variants?.length) < 10 ? `0${product.variants?.length}` : product.variants?.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        <button className="text-white bg-blue-500 rounded-md cursor-pointer" style={{ padding: "4px 4px" }}>
                                            <IoEye className="inline-block" size={20} style={{ marginTop: "-4px" }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-6 pt-4 text-sm text-blue-500 font-medium cursor-pointer text-end">
                <span>{loading ? "" : `View All ${totalProducts} Products`}</span>
            </div>
        </div>
    );
};

export default LatestProductsTable;