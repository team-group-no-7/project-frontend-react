function Stats() {

    const stats = 
    [
        { icon: "📄", number: "10K+", title: "Resources" },
        { icon: "👨‍🎓", number: "5K+", title: "Creators" },
        { icon: "👥", number: "50K+", title: "Learners" },
        { icon: "💰", number: "₹2Cr+", title: "Earned by Creators" }
    ]

    return (
        <div className="stats">
            {
                stats.map((item, index) => (
                    <div className="stat" key={index}>
                        <div className="icon">
                            {item.icon}
                        </div>
                        
                        <div>
                            <h3>{item.number}</h3>
                            <p>{item.title}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Stats;