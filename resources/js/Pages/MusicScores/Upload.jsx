import React from "react";
import { useForm } from "@inertiajs/react";

const Upload = () => {
    const { data, setData, post, errors, processing } = useForm({
        title: "",
        composer: "",
        lyrist: "",
        year_composed: "",
        midi_file: null,
        score_pdf: null,
        chorus: "",
        stanzas: "[]", // Default as an empty JSON array
        time_signature: "",
        mass_section: "",
        season: "",
        key_signature: "",
        keyboard_organ: false, // Checkbox default
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("music-scores.store"), {
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Upload Music Score
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Composer */}
                <div className="mb-4">
                    <label htmlFor="composer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Composer
                    </label>
                    <input
                        type="text"
                        id="composer"
                        value={data.composer}
                        onChange={(e) => setData("composer", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.composer && <p className="mt-2 text-sm text-red-600">{errors.composer}</p>}
                </div>

                {/* Lyrist */}
                <div className="mb-4">
                    <label htmlFor="lyrist" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lyrist
                    </label>
                    <input
                        type="text"
                        id="lyrist"
                        value={data.lyrist}
                        onChange={(e) => setData("lyrist", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.lyrist && <p className="mt-2 text-sm text-red-600">{errors.lyrist}</p>}
                </div>
                {/* Year of Release */}
                <div className="mb-4">
                    <label htmlFor="year_composed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Year of Release
                    </label>
                    <select
                        id="year_composed"
                        value={data.year_composed}
                        onChange={(e) => setData("year_composed", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a year
                        </option>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.year_composed && <p className="mt-2 text-sm text-red-600">{errors.year_composed}</p>}
                </div>
                {/* MIDI File */}
                <div className="mb-4">
                    <label htmlFor="midi_file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        MIDI File
                    </label>
                    <input
                        type="file"
                        id="midi_file"
                        accept=".mid"
                        onChange={(e) => setData("midi_file", e.target.files[0])}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.midi_file && <p className="mt-2 text-sm text-red-600">{errors.midi_file}</p>}
                </div>

                {/* Score PDF */}
                <div className="mb-4">
                    <label htmlFor="score_pdf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Score PDF
                    </label>
                    <input
                        type="file"
                        id="score_pdf"
                        accept=".pdf"
                        onChange={(e) => setData("score_pdf", e.target.files[0])}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.score_pdf && <p className="mt-2 text-sm text-red-600">{errors.score_pdf}</p>}
                </div>

                {/* Chorus */}
                <div className="mb-4">
                    <label htmlFor="chorus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Chorus
                    </label>
                    <textarea
                        id="chorus"
                        value={data.chorus}
                        onChange={(e) => setData("chorus", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.chorus && <p className="mt-2 text-sm text-red-600">{errors.chorus}</p>}
                </div>

                {/* Stanzas */}
                <div className="mb-4">
                    <label htmlFor="stanzas" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stanzas (JSON)
                    </label>
                    <textarea
                        id="stanzas"
                        value={data.stanzas}
                        onChange={(e) => {
                            try {
                                const parsedValue = JSON.parse(e.target.value);
                                if (Array.isArray(parsedValue)) {
                                    setData("stanzas", e.target.value); // Valid JSON
                                } else {
                                    throw new Error("Stanzas must be an array.");
                                }
                            } catch {
                                setData("stanzas", ""); // Clear invalid JSON
                            }
                        }}
                        placeholder={`[\n    {\n        "stanza": 1,\n        "lines": ["Line 1 of stanza 1", "Line 2 of stanza 1"]\n    },\n    {\n        "stanza": 2,\n        "lines": ["Line 1 of stanza 2", "Line 2 of stanza 2"]\n    }\n]`}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    {errors.stanzas && <p className="mt-2 text-sm text-red-600">{errors.stanzas}</p>}
                </div>

                {/* Time Signature */}
                <div className="mb-4">
                    <label
                        htmlFor="time_signature"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Time Signature
                    </label>
                    <select
                        id="time_signature"
                        value={data.time_signature}
                        onChange={(e) => setData("time_signature", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a time signature
                        </option>
                        {[
                            // Common Time Signatures
                            "2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "9/4", "11/4",
                            "2/8", "3/8", "4/8", "5/8", "6/8", "7/8", "9/8", "11/8", "13/8", "15/8", "17/8", "19/8", "21/8",
                            "2/16", "3/16", "4/16", "5/16", "6/16", "7/16", "9/16", "12/16", "13/16", "15/16", "25/16", "33/16",
                            // Additive Meters
                            "4+3/8", "2+2+3/8", "5+5+7/8", "3+3+2/8",
                            // Rare and Complex Time Signatures
                            "1/4", "1/8", "1/16", "10/4", "19/8", "24/16", "45/16"
                        ].map((signature) => (
                            <option key={signature} value={signature}>
                                {signature}
                            </option>
                        ))}
                    </select>
                    {errors.time_signature && (
                        <p className="mt-2 text-sm text-red-600">{errors.time_signature}</p>
                    )}
                </div>
                {/* Mass Section */}
                <div className="mb-4">
                    <label
                        htmlFor="mass_section"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Mass Section
                    </label>
                    <select
                        id="mass_section"
                        value={data.mass_section}
                        onChange={(e) => setData("mass_section", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a Mass Section
                        </option>
                        {[
                            "Kyrie",                // Lord, have mercy
                            "Gloria",               // Glory to God in the highest
                            "Credo",                // Nicene Creed (I believe in one God)
                            "Sanctus",              // Holy, Holy, Holy
                            "Agnus Dei",            // Lamb of God
                            "Introit",              // Entrance chant
                            "Gradual",              // Psalm response after the first reading
                            "Alleluia",             // Gospel acclamation (or Tract during Lent)
                            "Offertory",            // Offertory chant or hymn
                            "Offertory Procession", // Procession with gifts to the altar
                            "Communion",            // Communion chant or hymn
                            "Benedictus",           // Blessed is He (part of Sanctus in some settings)
                            "Dismissal",            // Final blessing and sending
                        ].map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                    {errors.mass_section && (
                        <p className="mt-2 text-sm text-red-600">{errors.mass_section}</p>
                    )}
                </div>


                {/* Season */}
                <div className="mb-4">
                    <label
                        htmlFor="season"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Season
                    </label>
                    <select
                        id="season"
                        value={data.season}
                        onChange={(e) => setData("season", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a Liturgical Season
                        </option>
                        {[
                            "Advent",             // Preparation for Christmas
                            "Christmas",          // Celebration of Christ's birth
                            "Ordinary Time",      // Time of growth and reflection
                            "Lent",               // Preparation for Easter
                            "Triduum",            // Holy Thursday, Good Friday, Holy Saturday
                            "Easter",             // Celebration of the Resurrection
                            "Pentecost",          // The coming of the Holy Spirit
                        ].map((season) => (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        ))}
                    </select>
                    {errors.season && (
                        <p className="mt-2 text-sm text-red-600">{errors.season}</p>
                    )}
                </div>

                {/* Key Signature */}
                <div className="mb-4">
                    <label
                        htmlFor="key_signature"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Key Signature
                    </label>
                    <select
                        id="key_signature"
                        value={data.key_signature}
                        onChange={(e) => setData("key_signature", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a Key Signature
                        </option>
                        {[
                            // A
                            "A Major", "A Minor", "A# Major", "A# Minor", "Ab Major", "Ab Minor",

                            // B
                            "B Major", "B Minor", "Bb Major", "Bb Minor",

                            // C
                            "C Major", "C Minor", "C# Major", "C# Minor",

                            // D
                            "D Major", "D Minor", "D# Major", "D# Minor", "Db Major", "Db Minor",

                            // E
                            "E Major", "E Minor", "Eb Major", "Eb Minor",

                            // F
                            "F Major", "F Minor", "F# Major", "F# Minor",

                            // G
                            "G Major", "G Minor", "G# Minor", "Gb Major"
                        ].map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                    {errors.key_signature && (
                        <p className="mt-2 text-sm text-red-600">{errors.key_signature}</p>
                    )}
                </div>



                {/* Keyboard/Organ */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="keyboard_organ"
                        checked={data.keyboard_organ}
                        onChange={(e) => setData("keyboard_organ", e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="keyboard_organ"
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Keyboard/Organ
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 text-white rounded-md ${processing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {processing ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
