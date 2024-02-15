import React from 'react';
import './News.css';

function Media({ loading }) {
    return (
        <div className="card" style={{ maxWidth: '345px', margin: '8px' }}>
            <div className="card-header">
                
                <div className="title-subtitle-container">
                    {loading ? (
                        <div className="skeleton" style={{ height: '10px', width: '80%', marginBottom: '6px' }}></div>
                    ) : (
                        <h3 className="card-title">Ted</h3>
                    )}
                    {loading ? (
                        <div className="skeleton" style={{ height: '10px', width: '40%' }}></div>
                    ) : (
                        <p className="card-subtitle">5 hours ago</p>
                    )}
                </div>
            </div>
            <div className="card-media">
                {loading ? (
                    <div className="skeleton" style={{ height: '190px' }}></div>
                ) : (
                    <img
                        src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                        alt="Nicola Sturgeon on a TED talk stage"
                        style={{ height: '140px', width: '100%', objectFit: 'cover' }}
                    />
                )}
            </div>
            <div className="card-content">
                {loading ? (
                    <>
                        <div className="skeleton" style={{ height: '10px', marginBottom: '6px' }}></div>
                        <div className="skeleton" style={{ height: '10px', width: '80%' }}></div>
                    </>
                ) : (
                    <p className="card-text">
                        {"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function News() {
    return (
        <div>
            <Media loading />
            <Media />
        </div>
    );
}
