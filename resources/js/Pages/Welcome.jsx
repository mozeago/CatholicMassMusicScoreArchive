import { Head, Link } from '@inertiajs/react';
import { useState } from "react";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [theme, setTheme] = useState('light'); // For theme switching
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu

    const handleSeasonClick = (season) => {
        setSelectedSeason(season);
    };

    const handleThemeSwitch = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        document.documentElement.classList.toggle("dark", theme === "light");
    };

    const massSections = {
        Advent: ["Kyrie", "Gloria", "Credo", "Sanctus", "Agnus Dei"],
        Christmas: ["Kyrie", "Gloria", "Credo", "Sanctus", "Agnus Dei"],
        Lent: ["Kyrie", "Credo", "Sanctus", "Agnus Dei"], // No Gloria during Lent
        Easter: ["Kyrie", "Gloria", "Credo", "Sanctus", "Agnus Dei"],
        "Ordinary Time": ["Kyrie", "Gloria", "Credo", "Sanctus", "Agnus Dei"],
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
    const filteredScores = scores[activeTab].filter((score) => {
        const timeSignatureMatch =
            selectedTimeSignature ? score.timeSignature === selectedTimeSignature : true;
        const keySignatureMatch =
            selectedKeySignature ? score.key === selectedKeySignature : true;
        return timeSignatureMatch && keySignatureMatch;
    });

    const timeSignatures = ["1/4", "2/4", "3/4", "3/8", "4/4", "5/4", "5/8", "6/4", "6/8",
        "7/4", "7/8", "9/8", "11/8", "12/8", "13/8"];
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
                        <header className={`sticky top-0 z-50 ${theme === "dark" ? "bg-black" : "bg-gray-50"} shadow-md`}>
                            <div className="py-4 px-6 flex items-center justify-between">
                                {/* Logo */}
                                <div className="flex items-center space-x-3">
                                    <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                                    <span className="text-lg font-semibold text-black dark:text-white">
                                        Catholic Mass Music
                                    </span>
                                </div>

                                {/* Search Input */}
                                <div className="flex-grow max-w-md mx-auto">
                                    <input
                                        type="text"
                                        placeholder="Search music scores..."
                                        className="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-gray-700 dark:bg-black dark:text-white"
                                    />
                                </div>

                                {/* Navigation */}
                                <nav className="flex items-center space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                    {/* Language Switch */}
                                    <button
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        onClick={() => alert("Switch Language")}
                                    >
                                        Language
                                    </button>
                                    {/* Theme Switcher */}
                                    <button
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
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

                            {/* Catholic Seasons and Mass Sections */}
                            <div className="bg-gray-200 dark:bg-gray-800 py-2 px-6 flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                <div className="flex space-x-4">
                                    {["Advent", "Christmas", "Lent", "Easter", "Ordinary Time"].map((season) => (
                                        <span
                                            key={season}
                                            className="cursor-pointer hover:text-[#FF2D20]"
                                            onClick={() => handleSeasonClick(season)}
                                        >
                                            {season}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Mass Sections Filter */}
                            <div className="bg-gray-200 dark:bg-gray-800 py-2 px-6">
                                <div className="flex space-x-4 text-sm text-gray-700 dark:text-gray-300">
                                    {availableMassSections.map((section) => (
                                        <span
                                            key={section}
                                            className="cursor-pointer hover:text-[#FF2D20]"
                                        >
                                            {section}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Menu Content */}
                            {isMenuOpen && (
                                <div className="lg:hidden bg-gray-200 dark:bg-gray-800 py-2 px-6 space-y-2">
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
                        </header>

                        {/* Main Content */}
                        <main className="mt-6">
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

                                {/* Time Signature Chips */}
                                <div className="mt-4 flex flex-wrap space-x-4">
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
                                <div className="mt-4 flex flex-wrap space-x-4 space-y-2">
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
                            Catholic Mass Music Score Archive @2025
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
