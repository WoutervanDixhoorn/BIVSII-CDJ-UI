
export default function CDJHeader({ title }: { title: string })
{
    return (
        <>
            <div className="cdjHeader">
                <h3>{ title }</h3>
            </div>
        </>
    );
};