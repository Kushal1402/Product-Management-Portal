const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-bold text-red-600">
                404
            </h1>

            <p className="mt-4 text-lg text-white-700 max-w-100 text-center">
                The page you are looking was moved, removed, renamed, or might never exist!
            </p>

            <button className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                <a href="/" className="mt-6 text-white-700 hover:underline">
                    Go to Home
                </a>
            </button>
        </div>
    );
}
export default Error;