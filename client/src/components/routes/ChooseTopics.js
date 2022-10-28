import { Add, ArrowBackIosNewRounded, ArrowForwardIos, TaskAltRounded } from '@mui/icons-material'
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

function ChooseTopics() {
    return (
        <Paper sx={{ color: "blueviolet" }}>
            <ShowTopics />
        </Paper>
    )
}

let ShowTopics = () => {
    let renderCategories = () => topicCategories.map((category, key) => <ShowCategoryTopics key={key} category={category} />)
    return (
        <Box sx={{ width: "68.1vw", margin: "auto" }}>
            {renderCategories()}
        </Box>
    )
}

let ShowCategoryTopics = ({ category }) => {
    let renderCategoryTopics = () => Object.values(category).map(name => <RenderTopics key={name} topics={name} />)
    return (
        <>
            <Typography sx={{ textAlign: "justify", pl: 3.5 }} variant='h4' component={"h2"}>{Object.keys(category)[0]}</Typography>
            {renderCategoryTopics()}
        </>
    )
}

let RenderTopics = ({ topics }) => {
    let [currentScroll, setCurrentScroll] = useState();

    let renderTopics = () => topics.map(topic => <RenderTopic key={topic} topic={topic} />)
    
    let handleLeft = (evt) => {

        console.log(evt.target.parentNode.parentNode.clientWidth, "left", evt.target.parentNode.parentNode)
    }
    
    let handleRight = (evt) => {
        console.log(evt.target.parentNode.parentNode.clientWidth, "right", evt.target.parentNode.parentNode)
    }

    useEffect(() => setCurrentScroll(1292), [])

    console.log(currentScroll, "currentScroll")
    
    return (
        <Stack
            sx={{
                flexDirection: "row",
                // flexWrap: "wrap",
                // overflowX: "scroll",
                overflowX: "hidden",
                m: 1,
                p: 1.5,
                backgroundColor: "lightskyblue",
                borderRadius: 2,
                alignItems: "center",
                position: "relative"
            }}
        >
            <IconButton onClick={handleLeft} sx={{position: "absolute", left: 0}}>
                <ArrowBackIosNewRounded sx={{visibility: currentScroll == "1292" ? "hidden" : "visible",  bgcolor: "lightsalmon", borderRadius: '50%', p: .6}} />
            </IconButton>
            {renderTopics()}
            <IconButton  onClick={handleRight} sx={{position: "absolute", right: 0}}>
                <ArrowForwardIos sx={{bgcolor: "lightsalmon", borderRadius: '50%', p: .6}} />
            </IconButton>
        </Stack>
    )
}

let RenderTopic = ({ topic }) => {
    let [clicked, setClicked] = useState(null)

    let toggleClicked = () => setClicked(!clicked)

    useEffect(() => setClicked(false), [topic])

    return (
        <Stack
            onClick={toggleClicked}
            sx={{
                minWidth: "fit-content",
                flexDirection: "row",
                gap: 4,
                m: 1,
                p: 1,
                backgroundColor: "lightgray",
                borderRadius: 2,
                alignItems: "center"
            }}
        >
            <Typography variant='h6' component={"p"} sx={{ pl: 1 }}>{topic}</Typography>

            <IconButton>
                {
                    clicked
                        ?
                        <TaskAltRounded fontSize='larger' />
                        :
                        <Add fontSize='larger' />
                }
            </IconButton>
        </Stack>
    )
}

let topicCategories = [
    { 'Fashion & beauty': ['Fashion business', 'Beauty', "Men's style", "Fashion models", 'Jewelry', 'Shoes', 'Gigi hadid', 'Adidas', 'Jeffree star', 'Beauty influencers', 'Fashion', 'Tattoos', 'Makeup', 'Sneakers', 'Shopping', 'PUMA', 'Streetwear', "Women's style", 'Barbara palvin', 'SNKRS', 'Skin care', 'Watches', 'Everyday style', 'Hair care', 'Athletic apparel', 'Handbags', 'Nike', 'Fashion magazines', 'Perfumes & fragrances', 'James charles'] },
    { 'Outdoors': ['Nature', 'Dogs', 'Horses', 'Cats', 'Sailing', 'Sharks', 'Reptiles', 'Beach life', 'Otters', 'Orangutans', 'Environmentalism', 'Birdwatching', 'Fishing', 'Rock climbing', 'Surfing', 'Rabbits', 'Hiking', 'Outdoor brands', 'Mountain biking', 'Scuba diving', 'National parks', 'Pets', 'Animals', 'Dinosaurs', 'Marine life', 'Camping', 'Mountain climbing', 'RVing', 'Gorillas'] },
    { 'Arts & culture': ['Inspirational quotes', 'Horoscope', 'Astrophotography', 'Interior design', 'Screenwriting', 'Aquarius', 'Arts & crafts', 'Taurus', 'Cancer', 'Phototgraphy', 'Books', 'Astrology', 'Scorpio', 'Popular illustrators', 'Animation', 'Art', 'Graphic design', 'Virgo', 'Pisces', 'Libra', 'Anime', 'Famous quotes', 'Comics', 'Health & wellness books', 'Gemini', 'Leo', 'Capricorn', 'Aries', 'Sci-fi & fantasy films', 'Sci-fi & fantasy'] },
    { 'Business & finance': ['Elon Mask', 'Venture capital', 'Marketing', 'Bitcoin cryptocurrency', '$BTC', '$TSLA', 'Chainlink cryptocurrency', 'Litecoin cryptocurrency', 'Dash cryptocurrency', 'Investing', 'Small business', 'Etherium cryptocurrency', 'Business personalities', 'FinTech', 'Ada cryptocurrency', 'Startups', 'Financial services', '$ETH', 'Matic Network cryptocurrency', 'Business News', 'Accounting', 'Business Media', 'Advertising', 'Telecom', 'TRON cryptocurrency', 'Ripple cryptocurrency', 'Tether cryptocurrency', 'Tim Cook', 'Non profit'] },
    { 'Anime & manga': ['Anime', 'Pokemon', 'Naruto', 'Haikyu', 'Kaiju', 'Fire Force', 'Code Geass', 'Bang Dream!', 'Hetalia', 'Pretty Cure', 'Comics', 'Attack on Titan', 'ONE PIECE', 'Jujutsu Kaisen', 'Love Live', 'Lupin The Third', 'Mobile Suit Gundam', "Gintama", 'YU-GI-OH!', 'King Kong', 'Popular Illustrators', 'Hunter x Hunter', 'Dragon Ball', 'Avatar: The Last Airbender', 'Neon Genesis Evangellion', 'Bryan Dechart', 'Sailor Moon', 'Mathew Mercer', 'Hypnosismic', "Fist of the North Star"] },
    { 'Home & family': ['Interior design', 'Gardening', 'Dating', 'Antiques', 'Food Inspiration', 'Vegetarianism', 'BBQ & grill', 'Brunch', 'Houseplants', 'At home', 'Environmentalism', 'Weddings', 'Parenting', 'Organic foods', 'DIY', 'Cooking', 'Baking', 'Spicy food', 'Pens & stationary', 'Arts & crafts', 'Architechture', 'Home Improvement', 'Pets', 'Homeschooling', 'Knitting', 'Seasonal cooking', 'Organic', 'Bread making', 'Model figure'] },
    { 'Food': ['Cooking', 'Food inspiration', 'Food photography', 'Food influencers', 'Tea', 'Coffee', 'Spicy food', 'Cake decoration', 'Asian cuisine', 'Burritos', 'Chefs', 'Organic foods', 'Veganism', 'Cooking videos', 'Brunch', 'Baking', 'Sweets & Deserts', 'Japanese cuisine', 'European cuisine', 'Cheese', 'Fast food', 'Vegeterianism', 'BBQ & grill', 'Seasonal cooking', 'Indian chefs', 'Indian cuisine', 'Bread making', 'Chinese cuisine', 'French cuisine', 'Wingstop'] },
    { 'Fitness': ['Yoga', 'Sporting goods', 'Fitness influencers', 'Crossfit', 'Workout videos', 'Nike', 'Pilates', 'Marathon', 'Ultramarathon', 'Track cycling', 'Cycling', 'Weight training', 'Fitness magazines', 'Athyletic apparel', 'Mindful wellness', 'Addidas', 'AG2R La Mondiale', 'HIIT', 'Spinning', 'Peloton', 'Bodybuilding', 'Running', 'Gym workouts', 'Fitness apps & trackera', 'Cardio', 'PUMA', 'Core fitness', 'Trail running', 'Lower body fitness', 'London Marathon'] },
    { 'Travel': ['Automotive', 'Language learning', 'Air travel', 'Travel news', 'Luxury travel', 'Theme parks', 'Rock climbing', 'India travel', 'Canada travel', 'Greece travel', 'National parks', 'Motorcycles', 'Travel guides', 'Hotels', 'Cuisine travel', 'Road trips', 'Africa travel', 'Las Vegas travel', 'Europe travel', 'China travel', 'Tesla Motors', 'Aviation', 'Business travel', 'Travel bloggers', 'Adventure travel', 'Museums & Institutions', 'Asia Pacific travel', 'Taj Mahal', 'United Kingdom travel', 'Australia travel'] },
    { 'Gaming': ['Video games', 'Game development', 'FIFA', 'Mobile gaming', 'PC gaming', 'Pokemon', 'League of Legends', 'Nintendo', 'PewDiePie', 'Arcade gaming', 'gaming news', 'PlayStation 5', 'Esports', 'Call of Duty', 'Xbox', 'Gaming consoles', 'Epic Games', 'Need for Speed', 'Cyberpunk 2077', 'Animal Crossing', "PlayerUnknown's Battleground", 'Chess', 'PlayStation', 'Gaming influencers', 'Counter-Strike', 'Roleplaying games', 'Fortnite', 'Robolox', 'MrBeast', 'PlayStation 4'] },
    { 'Music': ['Jungkook', 'Rap', 'Classic rock', 'Bollywood rock', 'Jimin', 'Taylor Swift', 'RM', 'Blues', 'Punjabi music', 'K-hip hop', 'BTS', 'Music news', 'Pop', 'EDM', 'Drake', 'Guitar', 'Rihana', 'Grammy Awards', 'Cardi B', 'R&B & soul', 'K-pop', 'Music iundustry', 'Classical music', 'EXO', 'Eminem', 'LISA(BLACKPINK)', 'Rock', 'Hip hop', 'Ariana Grande', 'Justin Beiber'] },
    { 'Entertainment': ['movies', 'Movie news', 'Movies & TV', 'Shah Rukh Khan', 'Entertainment news', 'Drake', 'Eminem', 'Taylor Swift', 'Rihana', 'Screenwriting', 'Celebreties', 'Marques Browniee', 'Bollywood films', 'Bollywood music', 'Bollywood news', 'Sci-fi & fantsy films', 'Ajay Decgn', 'Big Boss', 'Grammy Awards', 'Cardi B', 'Anime', 'Indian actors', 'Comedy', 'Scarlett Johansson', 'Marvel Universe', 'The Oscars', 'Top Gear', 'Digital creators', 'Jennifer Lawrence', 'Comedy films'] },
    { 'Careers': ['Education', 'Construction', 'Advertising', 'Language learning', 'Aviation', 'Mathematics', 'Homeschooling', 'Futurology', 'Carnegi Mellon University', 'California insititute of Technology', 'Accounting', 'History', 'Philosophy', 'Astronauts', 'Economics', 'Graduate school', 'Genealogy', 'Massachusetts Institute of Technology', 'John Hopkins University', 'Stanford University', 'Marketing', 'Online education', 'Job searching & networking', 'Architecture', 'College life', 'Harvard University', 'Indian Institute of technology(IITs)', 'Indian Institute of Management', 'University of Oxford', 'Yale University', ''] },
    { 'Sports': ['Virat Kohli', 'Cristiano Ronaldo', 'UEFA Champions League', 'La Liga', 'Sachin Tendulkar', 'Real Madrid CF', 'FA Cup', 'Marcus Rashford', 'Wayne Rooney', 'Los Angeles Lakers', 'Cricket', 'Premier League', 'Manchester United', 'WWE', 'Chelsea', 'Basketball', 'Liverpool FC', 'Formula 1', 'UEFA Europa League', 'Karim Benzema', 'Lionel Messi', 'Football', 'Sports news', 'FC Barcelona', 'Zenedine Zidane', 'Indian Premier League', 'Juventus FC', 'Rafael Nadal', 'Bruno Fernandes', 'Gareth Bale'] },
    { 'Science': ['Space', 'Weather', 'Biology', 'SpaceX', 'Environmentalism', 'Chemistry', 'Farm life', 'Space agencies & companies', 'Oceanography', 'Volcanoes', 'Agriculture', 'Science news', 'Archaeology', 'Geology', 'Biotech & biomedical', 'Astrophotography', 'Space missions', 'Weather videos', 'Zoology', 'Dinosaurs', 'Physics', 'Psychology', 'Geography', 'Astronauts', 'NASA', 'Supernatural', 'Earthquakes', 'Solar System', 'Space telescopes', 'Exoplanets'] },
    { 'Technology': ['Computer programming', 'Information security', 'Apple', 'Tech personlaities', 'Dogecoin cryptocurrency', 'Cloud computing', 'Open source', 'YouTube', 'Linux', 'FinTech', 'Elon Mask', 'Cybersecurity', 'Android', 'Tech news', 'Etherium cryptocurrency', 'TRON cryptocurrency', 'Virtual reality', 'Ripple cryptocurrency', 'tether cryptocurrency', '$BTC', 'Machine learning', 'Artificial intelligence', 'Bitcoin cryptocurrency', 'Web development', 'Internet of things', 'Data science', 'Databases', 'Augmented reality', 'Ada cryptocurrency', 'Tim Cook'] }
]

export default ChooseTopics