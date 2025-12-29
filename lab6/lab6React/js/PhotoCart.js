class PhotoCart extends React.Component {
    constructor(props) {
        super(props);
        this.cardsWrapperRef = React.createRef();
    }

    characters = [
        {
            name: "Темень",
            image: "https://static.wikia.nocookie.net/honkai-star-rail/images/b/b0/%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6_%D0%A2%D0%B5%D0%BC%D0%B5%D0%BD%D1%8C_%D0%A1%D0%BF%D0%BB%D1%8D%D1%88-%D0%B0%D1%80%D1%82.png/revision/latest/scale-to-width-down/1000?cb=20250912143857&path-prefix=ru"
        },
        {
            name: "Кирена",
            image: "https://static.wikia.nocookie.net/honkai-star-rail/images/4/4e/%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6_%D0%9A%D0%B8%D1%80%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BF%D0%BB%D1%8D%D1%88-%D0%B0%D1%80%D1%82.png/revision/latest/scale-to-width-down/1000?cb=20250911055101&path-prefix=ru"
        },
        {
            name: "Дань Хэн",
            image: "https://static.wikia.nocookie.net/honkai-star-rail/images/1/19/%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6_%D0%94%D0%B0%D0%BD%D1%8C_%D0%A5%D1%8D%D0%BD_%D0%9E%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_%D0%9F%D1%83%D1%81%D1%82%D0%BE%D1%88%D0%B5%D0%B9_%D0%A1%D0%BF%D0%BB%D1%8D%D1%88-%D0%B0%D1%80%D1%82.png/revision/latest/scale-to-width-down/1000?cb=20250912143840&path-prefix=ru"
        },
        {
            name: "Галлахер",
            image: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/2d/Character_Gallagher_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240327022011"
        },
        {
            name: "Миша",
            image: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/5c/Character_Misha_Splash_Art.png/revision/latest/scale-to-width-down/1000?cb=20240206022717"
        }
    ];

    scrollLeft = () => {
        if (this.cardsWrapperRef.current) {
            const cardWidth = 280 + 20;
            this.cardsWrapperRef.current.scrollLeft -= cardWidth;
        }
    }

    scrollRight = () => {
        if (this.cardsWrapperRef.current) {
            const cardWidth = 280 + 20;
            this.cardsWrapperRef.current.scrollLeft += cardWidth;
        }
    }

    render() {
        return (
            <div className="cards-container">
                <button className="arrow left-arrow" onClick={this.scrollLeft}>
                    ‹
                </button>

                <div className="cards-wrapper" ref={this.cardsWrapperRef}>
                    {this.characters.map((character, index) => (
                        <div key={index} className="card">
                            <div className="card-image">
                                <img src={character.image} alt={character.name} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{character.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="arrow right-arrow" onClick={this.scrollRight}>
                    ›
                </button>
            </div>
        );
    }
}