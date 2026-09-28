import { Award, Clock, FileSpreadsheet, Presentation, Book } from "lucide-react";
import React from "react";

const courseHighlights = [
    {
        Icon: Clock,
        title: "300+ Hours",
        description: "CFA® concept coaching",
        id: "i16ds",
    },
    {
        Icon: Clock,
        title: "50+ Hours",
        description: "Revision classes",
        id: "imb04",
    },
    {
        Icon: Clock,
        title: "10+ Hours",
        description: "Practical learning",
    },
    {
        Icon: Book,
        title: "Study Material",
        description: "Prep tools like MCQ, Doubtforum",
    },
];

const BannerDownSection = () => {
    return (
        <div className="course-details-section">
            <div className="container">
                <div className="course-details-container">
                    {courseHighlights.map(({ Icon, title, description, id }) => (
                        <div className="course-details-card" key={title}>
                            <div className="course-details-icon">
                                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <div className="course-details-content">
                                <h3>{title}</h3>
                                <p id={id}>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerDownSection;
