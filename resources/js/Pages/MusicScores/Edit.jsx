import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
const Upload = ({ musicScore }) => {
    const { data, setData, put, errors, processing } = useForm({
        title: musicScore.title || "",
        composer: musicScore.composer || "",
        lyrist: musicScore.lyrist || "",
        year_composed: musicScore.year_composed || "",
        midi_file: null,
        score_pdf: null,
        chorus: musicScore.chorus || "",
        stanzas: musicScore.stanzas || "[]",
        time_signature: musicScore.time_signature || "",
        mass_section: musicScore.mass_section || "",
        season: musicScore.season || "",
        key_signature: musicScore.key_signature || "",
        time_signature: musicScore.time_signature || "",
        keyboard_organ: musicScore.keyboard_organ || false,
        uploaded_by: musicScore.uploaded_by
    });
    const seasons = ["Advent", "Christmass", "Lent", "Easter", "Ordinary Time"];
    const massSections = [
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
    ];

    const keySignatures = ["A Major", "A Minor", "Ab Major", "B Major", "Bb Major", "B Minor",
        "C Major", "C Minor", "C# Minor", "D Major", "D Minor", "D# Minor",
        "Db Major", "E Major", "E Minor", "Eb Major", "Eb Minor", "F Major",
        "F Minor", "F# Major", "F# Minor", "G Major", "G Minor", "G# Minor"];
    const timeSignatures = [
        // Simple Time Signatures
        "1/4", "2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "8/4", "9/4", "10/4", "11/4", "12/4",
        "2/2", "2/8", "3/8", "3/2",
        "4/8", "8/8", "16/8",

        // Simple Asymmetric Time Signatures
        "5/8", "7/8", "9/8", "11/8", "13/8", "15/8", "17/8", "19/8", "21/8",

        // Compound Time Signatures
        "6/8",// Compound duple, triple, etc.
        "6/16", "9/16", "12/16",
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data before submit:", data); // Log the data here
        if (Object.keys(errors).length > 0) {
            console.log("Validation Errors:", errors);
            return; // Prevent the PUT request if there are errors
        }
        put(route("music-scores.update", { ulid: musicScore.ulid }), data, {
            preserveScroll: true,
        });
        console.log("Data After submit:", data);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Edit Music Score
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
                        accept=".mid,.midi,.smf,.kar"
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
                {/* Season Dropdown */}
                <div className="mb-4">
                    <label htmlFor="season" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Season
                    </label>
                    <select
                        id="season"
                        value={data.season}
                        onChange={(e) => setData("season", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {seasons.map((season) => (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        ))}
                    </select>
                    {errors.season && <p className="mt-2 text-sm text-red-600">{errors.season}</p>}
                </div>
                {/* Mass Section Dropdown */}
                <div className="mb-4">
                    <label htmlFor="mass_section" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mass Section
                    </label>
                    <select
                        id="mass_section"
                        value={data.mass_section}
                        onChange={(e) => setData("mass_section", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {massSections.map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                    {errors.mass_section && <p className="mt-2 text-sm text-red-600">{errors.mass_section}</p>}
                </div>
                {/* Key Signature Dropdown */}
                <div className="mb-4">
                    <label htmlFor="key_signature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Key Signature
                    </label>
                    <select
                        id="key_signature"
                        value={data.key_signature}
                        onChange={(e) => setData("key_signature", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {keySignatures.map((keySignature) => (
                            <option key={keySignature} value={keySignature}>
                                {keySignature}
                            </option>
                        ))}
                    </select>
                    {errors.key_signature && <p className="mt-2 text-sm text-red-600">{errors.key_signature}</p>}
                </div>
                {/* Time Signature Dropdown */}
                <div className="mb-4">
                    <label htmlFor="time_signature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Time Signature
                    </label>
                    <select
                        id="time_signature"
                        value={data.time_signature}
                        onChange={(e) => setData("time_signature", e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {timeSignatures.map((timeSignature) => (
                            <option key={timeSignature} value={timeSignature}>
                                {timeSignature}
                            </option>
                        ))}
                    </select>
                    {errors.time_signature && <p className="mt-2 text-sm text-red-600">{errors.time_signature}</p>}
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
                        onChange={(e) => setData("stanzas", e.target.value)}
                        placeholder={`[\n    {\n        "stanza": 1,\n        "lines": ["Line 1 of stanza 1", "Line 2 of stanza 1"]\n    },\n    {\n        "stanza": 2,\n        "lines": ["Line 1 of stanza 2", "Line 2 of stanza 2"]\n    }\n]`}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    {errors.stanzas && <p className="mt-2 text-sm text-red-600">{errors.stanzas}</p>}
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
                        {processing ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Upload;
