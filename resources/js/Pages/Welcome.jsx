import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from "react";
export default function Welcome({ auth, laravelVersion, phpVersion, appName }) {
    const musicScores = usePage().props.musicScores;
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedMassSection, setSelectedMassSection] = useState(null);
    const [theme, setTheme] = useState('light'); // For theme switching
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu

    const handleSeasonClick = (season) => {
        setSelectedSeason(season);
        setSelectedMassSection(null); // Reset mass section when season changes
    };

    const handleThemeSwitch = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        document.documentElement.classList.toggle("dark", theme === "light");
    };

    const massSections = {
        Advent: [
            "Introit (Injili ya Kuingia)", // Entrance chant
            "Entrance Antiphon (Antifona ya Kuingia)", // Opening hymn/chant
            "Penitential Act (Kitubio)", // Acknowledgement of sins
            "Kyrie (Kirie)", // "Lord, have mercy"
            "Gloria (Utukufu)", // Hymn of praise (omitted during Lent)
            "Collect (Sala ya Mwisho ya Kuingia)", // Opening prayer
            "First Reading (Somo la Kwanza)", // From the Old Testament or Acts
            "Responsorial Psalm (Zaburi ya Kujibu)", // Sung or spoken psalm
            "Second Reading (Somo la Pili)", // From the New Testament letters
            "Gospel Acclamation (Aleluya ya Injili)", // "Alleluia" or seasonal chant
            "Gospel (Injili)", // From one of the Gospels
            "Homily (Mahubiri)", // Sermon by the priest
            "Creed (Kanuni ya Imani)", // Profession of faith
            "Prayers of the Faithful (Maombi ya Waamini)", // General intercessions
            "Offertory (Sadaka)", // Presentation of gifts
            "Sanctus (Mtakatifu)", // "Holy, Holy, Holy"
            "Eucharistic Prayer (Sala ya Ekaristi)", // Includes consecration
            "Agnus Dei (Mwanakondoo wa Mungu)", // "Lamb of God"
            "Communion Antiphon (Antifona ya Komunio)", // Accompanying chant
            "Prayer After Communion (Sala ya Mwisho ya Komunio)", // Closing prayer
            "Blessing (Baraka)", // Final blessing
            "Dismissal (Kutumwa)", // Sending forth
        ],
        Christmas: [
            "Introit (Injili ya Kuingia)",
            "Entrance Antiphon (Antifona ya Kuingia)",
            "Penitential Act (Kitubio)",
            "Kyrie (Kirie)",
            "Gloria (Utukufu)",
            "Collect (Sala ya Mwisho ya Kuingia)",
            "First Reading (Somo la Kwanza)",
            "Responsorial Psalm (Zaburi ya Kujibu)",
            "Second Reading (Somo la Pili)",
            "Gospel Acclamation (Aleluya ya Injili)",
            "Gospel (Injili)",
            "Homily (Mahubiri)",
            "Creed (Kanuni ya Imani)",
            "Prayers of the Faithful (Maombi ya Waamini)",
            "Offertory (Sadaka)",
            "Sanctus (Mtakatifu)",
            "Eucharistic Prayer (Sala ya Ekaristi)",
            "Agnus Dei (Mwanakondoo wa Mungu)",
            "Communion Antiphon (Antifona ya Komunio)",
            "Prayer After Communion (Sala ya Mwisho ya Komunio)",
            "Blessing (Baraka)",
            "Dismissal (Kutumwa)",
        ],
        Lent: [
            "Introit (Injili ya Kuingia)",
            "Entrance Antiphon (Antifona ya Kuingia)",
            "Penitential Act (Kitubio)",
            "Kyrie (Kirie)",
            "Collect (Sala ya Mwisho ya Kuingia)",
            "First Reading (Somo la Kwanza)",
            "Responsorial Psalm (Zaburi ya Kujibu)",
            "Second Reading (Somo la Pili)",
            "Gospel Acclamation (Aleluya ya Injili)", // Seasonal chant replaces "Alleluia"
            "Gospel (Injili)",
            "Homily (Mahubiri)",
            "Creed (Kanuni ya Imani)",
            "Prayers of the Faithful (Maombi ya Waamini)",
            "Offertory (Sadaka)",
            "Sanctus (Mtakatifu)",
            "Eucharistic Prayer (Sala ya Ekaristi)",
            "Agnus Dei (Mwanakondoo wa Mungu)",
            "Communion Antiphon (Antifona ya Komunio)",
            "Prayer After Communion (Sala ya Mwisho ya Komunio)",
            "Blessing (Baraka)",
            "Dismissal (Kutumwa)",
        ],
        Easter: [
            "Introit (Injili ya Kuingia)",
            "Entrance Antiphon (Antifona ya Kuingia)",
            "Penitential Act (Kitubio)",
            "Kyrie (Kirie)",
            "Gloria (Utukufu)",
            "Collect (Sala ya Mwisho ya Kuingia)",
            "First Reading (Somo la Kwanza)",
            "Responsorial Psalm (Zaburi ya Kujibu)",
            "Second Reading (Somo la Pili)",
            "Gospel Acclamation (Aleluya ya Injili)",
            "Gospel (Injili)",
            "Homily (Mahubiri)",
            "Creed (Kanuni ya Imani)",
            "Prayers of the Faithful (Maombi ya Waamini)",
            "Offertory (Sadaka)",
            "Sanctus (Mtakatifu)",
            "Eucharistic Prayer (Sala ya Ekaristi)",
            "Agnus Dei (Mwanakondoo wa Mungu)",
            "Communion Antiphon (Antifona ya Komunio)",
            "Prayer After Communion (Sala ya Mwisho ya Komunio)",
            "Blessing (Baraka)",
            "Dismissal (Kutumwa)",
        ],
        "Ordinary Time": [
            "Introit (Injili ya Kuingia)",
            "Entrance Antiphon (Antifona ya Kuingia)",
            "Penitential Act (Kitubio)",
            "Kyrie (Kirie)",
            "Gloria (Utukufu)",
            "Collect (Sala ya Mwisho ya Kuingia)",
            "First Reading (Somo la Kwanza)",
            "Responsorial Psalm (Zaburi ya Kujibu)",
            "Second Reading (Somo la Pili)",
            "Gospel Acclamation (Aleluya ya Injili)",
            "Gospel (Injili)",
            "Homily (Mahubiri)",
            "Creed (Kanuni ya Imani)",
            "Prayers of the Faithful (Maombi ya Waamini)",
            "Offertory (Sadaka)",
            "Sanctus (Mtakatifu)",
            "Eucharistic Prayer (Sala ya Ekaristi)",
            "Agnus Dei (Mwanakondoo wa Mungu)",
            "Communion Antiphon (Antifona ya Komunio)",
            "Prayer After Communion (Sala ya Mwisho ya Komunio)",
            "Blessing (Baraka)",
            "Dismissal (Kutumwa)",
        ],
    };


    const availableMassSections = massSections[selectedSeason] || massSections["Ordinary Time"];
    const [activeTab, setActiveTab] = useState("mostViewed");
    const [selectedTimeSignature, setSelectedTimeSignature] = useState(null);
    const [selectedKeySignature, setSelectedKeySignature] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSelectedTimeSignature(null); // Reset filters when tab changes
        setSelectedKeySignature(null); // Reset filters when tab changes
    };

    const handleTimeSignatureClick = (timeSignature) => {
        setSelectedTimeSignature(timeSignature);
    };

    const handleKeySignatureClick = (keySignature) => {
        setSelectedKeySignature(keySignature);
    };

    const scores = {
        mostViewed: Array.from({ length: 5 }).map((_, i) => ({
            title: `Music Score Title ${i + 1}`,
            composer: "John Doe",
            timeSignature: i % 2 === 0 ? "4/4" : "6/8",
            pages: Math.floor(Math.random() * 10) + 1,
            key: i % 2 === 0 ? "C Major" : "G Major",
            keyboardOrgan: i % 2 === 0 ? "Yes" : "No",
            downloads: i * 100,
        })),
        mostDownloaded: Array.from({ length: 5 }).map((_, i) => ({
            title: `Music Score Title ${i + 1}`,
            composer: "Jane Smith",
            timeSignature: "3/4",
            pages: Math.floor(Math.random() * 10) + 1,
            key: "G Major",
            keyboardOrgan: i % 2 === 0 ? "Yes" : "No",
            downloads: i * 50,
        })),
        mostLiked: Array.from({ length: 5 }).map((_, i) => ({
            title: `Music Score Title ${i + 1}`,
            composer: "Ann Brown",
            timeSignature: "6/8",
            pages: Math.floor(Math.random() * 10) + 1,
            key: "F Major",
            keyboardOrgan: i % 2 === 0 ? "Yes" : "No",
            downloads: i * 25,
        })),
        mostShared: Array.from({ length: 5 }).map((_, i) => ({
            title: `Music Score Title ${i + 1}`,
            composer: "Michael White",
            timeSignature: "4/4",
            pages: Math.floor(Math.random() * 10) + 1,
            key: "E Minor",
            keyboardOrgan: i % 2 === 0 ? "Yes" : "No",
            downloads: i * 15,
        })),
        latestUploaded: Array.from({ length: 5 }).map((_, i) => ({
            title: `Music Score Title ${i + 1}`,
            composer: "Laura Green",
            timeSignature: "2/4",
            pages: Math.floor(Math.random() * 10) + 1,
            key: "D Major",
            keyboardOrgan: i % 2 === 0 ? "Yes" : "No",
            downloads: i * 30,
        }))
    };
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    // Filter the scores based on the selected time and key signature
    const filteredScores = musicScores.filter((score) => {
        const searchTermLower = searchTerm.toLowerCase();
        // Match against real-time search
        const searchMatch = [
            score.title?.toLowerCase().includes(searchTermLower),
            score.composer?.toLowerCase().includes(searchTermLower),
            score.lyrist?.toLowerCase().includes(searchTermLower),
            score.year_composed?.toString().includes(searchTermLower),
            score.uploaded_by?.toString().includes(searchTermLower),
            score.chorus?.toLowerCase().includes(searchTermLower),
            JSON.stringify(score.stanzas || "").toLowerCase().includes(searchTermLower),
            score.mass_section?.toLowerCase().includes(searchTermLower),
            score.season?.toLowerCase().includes(searchTermLower),
        ].some((match) => match);
        const seasonMatch = selectedSeason
            ? score.season === selectedSeason
            : true;
        const massSectionMatch = selectedMassSection
            ? score.mass_section === selectedMassSection
            : true;
        const timeSignatureMatch = selectedTimeSignature
            ? score.time_signature === selectedTimeSignature
            : true;
        const keySignatureMatch = selectedKeySignature
            ? score.key_signature === selectedKeySignature
            : true;

        return searchMatch && seasonMatch && massSectionMatch && timeSignatureMatch && keySignatureMatch;
    });

    const timeSignatures = [
        // Simple Time Signatures
        "1/4", "2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "8/4", "9/4", "10/4", "11/4", "12/4",
        "2/2", "2/8", "3/8", "3/2",
        // "4/8", "8/8", "16/8",

        // // Simple Asymmetric Time Signatures
        // "5/8", "7/8", "9/8", "11/8", "13/8", "15/8", "17/8", "19/8", "21/8",

        // // Compound Time Signatures
        // "6/8", "9/8", // Compound duple, triple, etc.
        // "6/16", "9/16", "12/16",
    ];
    const keySignatures = ["A Major", "A Minor", "Ab Major", "B Major", "Bb Major", "B Minor",
        "C Major", "C Minor", "C# Minor", "D Major", "D Minor", "D# Minor",
        "Db Major", "E Major", "E Minor", "Eb Major", "Eb Minor", "F Major",
        "F Minor", "F# Major", "F# Minor", "G Major", "G Minor", "G# Minor"];
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        {/* Sticky Header */}
                        <header className={`sticky top-0 z-50 ${theme === "dark" ? "bg-black" : "bg-gray-800"} shadow-md`}>
                            <div className="py-4 px-6 flex items-center justify-between">
                                {/* Logo */}
                                <div className="flex items-center space-x-3">
                                    <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                                    <span className="text-lg font-semibold text-white dark:text-white">
                                        {appName}
                                    </span>
                                </div>

                                {/* Search Input */}
                                <div className="flex-grow max-w-md mx-auto mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search music scores..."
                                        className="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-gray-700 dark:bg-black dark:text-white"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Navigation */}
                                <nav className="flex items-center space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                    {/* Language Switch */}
                                    <button
                                        className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        onClick={() => alert("Switch Language")}
                                    >
                                        Language
                                    </button>
                                    {/* Theme Switcher */}
                                    <button
                                        className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        onClick={handleThemeSwitch}
                                    >
                                        Theme
                                    </button>
                                </nav>

                                {/* Mobile Menu Toggle */}
                                <button
                                    className="block lg:hidden"
                                    onClick={() => setIsMenuOpen((prev) => !prev)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Seasons and Mass Sections Layout */}
                            <div className="bg-gray-800 dark:bg-gray-900 py-2 px-6 text-sm text-gray-300 dark:text-gray-300">
                                {/* Season Tabs */}
                                <div className="flex space-x-4 mb-4 border-b border-gray-600">
                                    {["Advent", "Christmas", "Lent", "Easter", "Ordinary Time"].map((season) => (
                                        <span
                                            key={season}
                                            className={`cursor-pointer py-2 px-4 rounded-t-lg transition-all duration-300
                    ${selectedSeason === season ? "bg-[#FF2D20] text-white" : "hover:bg-gray-700"}`}
                                            onClick={() => handleSeasonClick(season)}
                                        >
                                            {season}
                                        </span>
                                    ))}
                                </div>

                                {/* Mass Sections for the Selected Season (Row Layout) */}
                                <div className="flex flex-wrap space-x-6 mb-4">
                                    {availableMassSections.map((section) => (
                                        <div
                                            key={section}
                                            className={`flex items-center space-x-3 cursor-pointer py-2 px-4 rounded-lg transition-all duration-300
                ${selectedMassSection === section
                                                    ? "bg-gray-700 text-white"
                                                    : "hover:bg-gray-700 text-gray-300 dark:text-gray-300"
                                                }`}
                                            onClick={() => setSelectedMassSection(section)} // Update selectedMassSection state on click
                                        >
                                            <span className="text-[#FF2D20]">{section}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>


                            {/* Mobile Menu Content */}
                            {isMenuOpen && (
                                <div className="lg:hidden bg-gray-800 dark:bg-gray-900 py-2 px-6 space-y-2">
                                    {["Advent", "Christmas", "Lent", "Easter", "Ordinary Time"].map((season) => (
                                        <span
                                            key={season}
                                            className="block cursor-pointer hover:text-[#FF2D20]"
                                            onClick={() => handleSeasonClick(season)}
                                        >
                                            {season}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className='py-4 px-6'>
                                {/* Time Signature Chips */}
                                <div className="mt-4 flex flex-wrap gap-2 justify-start">
                                    {timeSignatures.map((timeSignature) => (
                                        <button
                                            key={timeSignature}
                                            className={`px-4 py-2 text-sm font-medium rounded-full ${selectedTimeSignature === timeSignature
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                }`}
                                            onClick={() => handleTimeSignatureClick(timeSignature)}
                                        >
                                            {timeSignature}
                                        </button>
                                    ))}
                                </div>

                                {/* Key Signature Chips */}
                                <div className="mt-4 flex flex-wrap gap-2 justify-start">
                                    {keySignatures.map((keySignature) => (
                                        <button
                                            key={keySignature}
                                            className={`px-4 py-2 text-sm font-medium rounded-full ${selectedKeySignature === keySignature
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                }`}
                                            onClick={() => handleKeySignatureClick(keySignature)}
                                        >
                                            {keySignature}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </header>

                        {/* Main Content */}
                        <main className="mt-6">
                            {/* Display First 20 Music Scores based on the Season and mass sectionfilter*/}
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Featured Music Scores
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                                    {filteredScores.map((score, index) => (
                                        <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-xl transition transform hover:scale-105">
                                            <div className="relative">
                                                <img
                                                    src={`https://placehold.co/600x400/000000/FFFFFF/png?text=Score+${index + 1}`}
                                                    alt={`Music Score ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                                                <h4 className="font-semibold text-lg truncate">{score.title}</h4>

                                                {/* Two Column Layout for Details */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                    <p><strong>Composer:</strong> {score.composer || "unknown"}</p>
                                                    <p><strong>Time Signature:</strong> {score.time_signature || "N/A"}</p>
                                                    <p><strong>Season:</strong> {score.season || "N/A"}</p>
                                                    <p><strong>Mass Section:</strong> {score.mass_section || "N/A"}</p>
                                                    <p><strong>Pages:</strong> {score.pages || "N/A"}</p>
                                                    <p><strong>Key:</strong> {score.key_signature || "N/A"}</p>
                                                    <p><strong>Keyboard/Organ:</strong> {score.keyboard_organ || "N/A"}</p>
                                                    <p><strong>Downloads:</strong> {score.downloads || "N/A"}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <button className="rounded-md bg-red-600 px-4 py-2 text-white text-sm font-medium hover:bg-red-700 transition">
                                                    <i className="fas fa-download mr-2"></i>Download
                                                </button>
                                                <button className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition">
                                                    <i className="fas fa-share-alt mr-2"></i>Share
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <div className="space-y-8">
                                {/* Tab Headers */}
                                <div className="flex space-x-8 border-b border-gray-300 pb-4">
                                    <button
                                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "mostViewed"
                                            ? "border-b-4 border-red-600 text-red-600"
                                            : "text-gray-600 hover:text-red-500"
                                            }`}
                                        onClick={() => handleTabClick("mostViewed")}
                                    >
                                        Most Viewed
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "mostDownloaded"
                                            ? "border-b-4 border-red-600 text-red-600"
                                            : "text-gray-600 hover:text-red-500"
                                            }`}
                                        onClick={() => handleTabClick("mostDownloaded")}
                                    >
                                        Most Downloaded
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "mostLiked"
                                            ? "border-b-4 border-red-600 text-red-600"
                                            : "text-gray-600 hover:text-red-500"
                                            }`}
                                        onClick={() => handleTabClick("mostLiked")}
                                    >
                                        Most Liked
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "mostShared"
                                            ? "border-b-4 border-red-600 text-red-600"
                                            : "text-gray-600 hover:text-red-500"
                                            }`}
                                        onClick={() => handleTabClick("mostShared")}
                                    >
                                        Most Shared
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "latestUploaded"
                                            ? "border-b-4 border-red-600 text-red-600"
                                            : "text-gray-600 hover:text-red-500"
                                            }`}
                                        onClick={() => handleTabClick("latestUploaded")}
                                    >
                                        Latest Uploaded
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        {activeTab === "mostViewed" && "Most Viewed Music Scores"}
                                        {activeTab === "mostDownloaded" && "Most Downloaded Music Scores"}
                                        {activeTab === "mostLiked" && "Most Liked Music Scores"}
                                        {activeTab === "mostShared" && "Most Shared Music Scores"}
                                        {activeTab === "latestUploaded" && "Latest Uploaded Music Scores"}
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                                        {filteredScores.map((score, index) => (
                                            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-xl transition transform hover:scale-105">
                                                <div className="relative">
                                                    <img
                                                        src={`https://placehold.co/600x400/000000/FFFFFF/png?text=Score+${index + 1}`}
                                                        alt={`Music Score ${index + 1}`}
                                                        className="w-full h-40 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                                                    <h4 className="font-semibold text-lg truncate">{score.title}</h4>

                                                    {/* Two Column Layout for Details */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                        <p><strong>Composer:</strong> {score.composer}</p>
                                                        <p><strong>Time Signature:</strong> {score.timeSignature}</p>
                                                        <p><strong>Pages:</strong> {score.pages}</p>
                                                        <p><strong>Key:</strong> {score.key}</p>
                                                        <p><strong>Keyboard/Organ:</strong> {score.keyboardOrgan}</p>
                                                        <p><strong>Downloads:</strong> {score.downloads}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <button className="rounded-md bg-red-600 px-4 py-2 text-white text-sm font-medium hover:bg-red-700 transition">
                                                        <i className="fas fa-download mr-2"></i>Download
                                                    </button>
                                                    <button className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition">
                                                        <i className="fas fa-share-alt mr-2"></i>Share
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            {appName} @2025
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
