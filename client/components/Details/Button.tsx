export default function Button({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <button className="rounded-primary bg-blue-600 px-5 py-3 leading-5 text-white duration-300 hover:bg-blue-600/80 lg:px-6 lg:py-4">
            {children}
        </button>
    );
}
