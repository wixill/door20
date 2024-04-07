import React, { useState } from "react";
import $ from "jquery";
import {updateDoc, getDoc, doc} from "firebase/firestore";
import {db} from '../firebase';

function UploadStatsButton({ docId }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                setIsLoading(true);

                const fileContent = await readFileContent(selectedFile);
                const stats = await compileStats(fileContent);

                const docRef = doc(db, "campaigns", docId);
                await updateDoc(docRef, {
                    players: stats
                });

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error uploading file:", error);
            }
        } else {
            alert("Please select a file");
        }
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    };

    const compileStats = async (htmlContent) => {
        if (!docId) {
            throw new Error("Campaign Not Selected!");
        }

        let stats = null;
        const $html = $(htmlContent);
        const docRef = doc(db, "campaigns", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            stats = {...docSnap.get("players")};
            const playerIndices = Object.keys(stats);

            playerIndices.forEach((index) => {
                stats[index].crits = 0;
                stats[index].fails = 0;
            });

            const $messages = $html.find('.message');

            $messages.each(function(index) {
                const $message = $(this);
                const $roll = $message.find('.inlinerollresult[title*="1d20"][class*="full"],.inlinerollresult[original-title*="1d20"][class*="full"]').not('.sheet-grey .inlinerollresult');

                if ($roll.length) {
                    let $by = $message.find('.by');
                    if (!$by.length) {
                        for (var i = index - 1; i >= 0; i--) {
                            const $prevMessage = $($messages[i]);
                            $by = $prevMessage.find('.by');
                            if ($by.length) {
                                break;
                            }
                        }
                    }
                    const byText = $by.text().toLowerCase();

                    let playerFound = false;
                    for (let index of playerIndices) {
                        const names = stats[index].names ?? [];
                        let targetPlayer = false;

                        for (let name of names) {
                            if (byText.includes(name)) {
                                targetPlayer = true;
                                break;
                            }
                        }

                        if (targetPlayer) {
                            if ($roll.hasClass('fullfail')) {
                                stats[index].fails++;
                            } else if ($roll.hasClass('fullcrit')) {
                                stats[index].crits++;
                            }
                            
                            playerFound = true;
                            break;
                        }
                    }

                    if (!playerFound) {
                        if ($roll.hasClass('fullfail')) {
                            stats['gamemaster'].fails++;
                        } else if ($roll.hasClass('fullcrit')) {
                            stats['gamemaster'].crits++;
                        }
                    }
                }
            });
        } else {
            throw new Error(`Error fetching ${docId} stats.`);
        }
        
        return stats;
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <span className={"file-status" + (isLoading ? " loading" : "")}>Loading</span>
        </div>
    );
};

export default UploadStatsButton;
