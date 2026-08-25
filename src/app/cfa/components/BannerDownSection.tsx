import { Award, Clock, FileSpreadsheet, Presentation } from "lucide-react";
import React from "react";

const courseHighlights = [
    {
        Icon: Clock,
        title: "200+ Hours",
        description: "Hands-on practical learning",
        id: "i16ds",
    },
    {
        Icon: Presentation,
        title: "Live Sessions",
        description: "Learn directly with faculty",
        id: "imb04",
    },
    {
        Icon: FileSpreadsheet,
        title: "Study Material",
        description: "Excel models, templates & resources",
    },
    {
        Icon: Award,
        title: "Certification",
        description: "Certificate on course completion",
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
