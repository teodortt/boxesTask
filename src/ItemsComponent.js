const Items = ({ item, setItems }) => {

    const handleMovement = (type) => {

        fetch('/move-element', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.id, top: type === 'down' ? item.top + 1 : item.top - 1 }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div className="itemsContainer" key={item.id}>
            <div className="itemBox" style={{ top: `${item.top * 10}px` }}>
                <button className="btn btn-success mx-3" onClick={() => handleMovement('up')}>Up</button>
                <span>{item.label}</span>
                <button className="btn btn-success mx-3" onClick={() => handleMovement('down')}>Down</button>
            </div>
        </div>
    )
}

export default Items;