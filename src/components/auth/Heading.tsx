interface HeadingProps {
    title: string;
    description?: string;
}

export default function Heading({title, description}: HeadingProps) {
    return (
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
        </div>
    );
}