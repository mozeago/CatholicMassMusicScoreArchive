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
        keyboard_organ: musicScore.keyboard_organ || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("music-scores.update", musicScore), {
            preserveScroll: true,
        });
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
                        onChange={(e) => setData("stanzas", e.target.value)}
                        placeholder={`[\n    {\n        "stanza": 1,\n        "lines": ["Line 1 of stanza 1", "Line 2 of stanza 1"]\n    },\n    {\n        "stanza": 2,\n        "lines": ["Line 1 of stanza 2", "Line 2 of stanza 2"]\n    }\n]`}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    {errors.stanzas && <p className="mt-2 text-sm text-red-600">{errors.stanzas}</p>}
                </div>

                {/* Other fields... */}

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
