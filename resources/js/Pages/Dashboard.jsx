import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard({ musicScores }) {
    const [scoreList, setScores] = useState(musicScores);
    const { flash } = usePage().props;
    const handleEdit = (ulid) => {
        // Redirect to the edit page for the specific score
        window.location.href = `/music-scores/${ulid}/edit`;
    };

    const handleDelete = (ulid) => {
        if (confirm('Are you sure you want to delete this score?')) {
            // Use Inertia to send the delete request
            Inertia.delete(`/music-scores/${ulid}`, {
                onSuccess: () => {
                    // Refresh the list without reloading the whole page
                    setScores((prevScores) => prevScores.filter(musicScore => musicScore.ulid !== ulid));
                },
                onError: () => {
                    alert('Failed to delete score.');
                },
            });
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Your Music Scores
                </h2>
            }
        >
            <Head title="Dashboard" />
            {/* Display the error message if it exists */}
            {flash && flash.error && (
                <div className="alert alert-danger">
                    {flash.error}
                </div>
            )}
            {/* Display the success message if it exists */}
            {flash && flash.success && (
                <div className="alert alert-success">
                    {flash.success}
                </div>
            )}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {scoreList.length > 0 ? (
                        scoreList.map((musicScore) => (
                            <div key={musicScore.ulid} className="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-4">
                                <div className="p-6 text-gray-900">
                                    <h3 className="text-xl font-semibold">{musicScore.title}</h3>
                                    <p className="text-gray-700">Composer: {musicScore.composer}</p>
                                    <p className="text-gray-500">Year Composed: {musicScore.year_composed}</p>
                                    <p className="text-gray-500">Time Signature: {musicScore.time_signature}</p>
                                    <p className="text-gray-500">Key Signature: {musicScore.key_signature}</p>
                                    <p className="text-gray-500">Suitable for Season: {musicScore.season}</p>
                                    <p className="text-gray-500">Mass Section: {musicScore.mass_section}</p>
                                    <p className="text-gray-500">Lyrist: {musicScore.lyrist}</p>

                                    {/* Add more fields as needed */}
                                    {/* Edit and Delete Buttons */}
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(musicScore.ulid)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(musicScore.ulid)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No music scores available.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
