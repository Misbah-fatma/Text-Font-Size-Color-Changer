import React, { useState, useEffect } from 'react';

const TextStyler = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    // Save the current state to history whenever text, fontSize, or fontColor changes
    setHistory([...history.slice(0, currentStep + 1), { text, fontSize, fontColor }]);
    setCurrentStep(history.length);
  }, [text, fontSize, fontColor]);

  const applyStyles = () => {
    // Set styles using state values
    const styles = {
      fontSize: fontSize,
      color: fontColor,
    };
    
    // Apply styles to the paragraph
    return (
      <p style={styles}>
        {text || 'This is a sample paragraph.'}
      </p>
    );
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const { text, fontSize, fontColor } = history[currentStep - 1];
      setText(text);
      setFontSize(fontSize);
      setFontColor(fontColor);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      const { text, fontSize, fontColor } = history[currentStep + 1];
      setText(text);
      setFontSize(fontSize);
      setFontColor(fontColor);
    }
  };


  return (
    <div>
       <section className="dark">
        <div className="container py-2">
            <h1 className="h1 text-center" id="pageHeaderTitle">CelebRare Assignment</h1>
    
            <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src="https://picsum.photos/1000/1000" alt="Image Title" />
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href="#">Text FONT, SIZE, COLOR CHANGER</a></h1>
                    <div className="postcard__subtitle small">
                        <time datetime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>Fri, 29th DEC 2023
                        </time>
                    </div>
                   
                    <div className="row">
                    <div className="postcard__tagbox">
                    <div className="col-sm">
                   
                    <span className="tag__item"><i className="fas fa-tag mr-2"></i> Text</span>
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                          </div>
                         
                          <div className="col-sm">
                          <span className="tag__item"><i className="fas fa-clock mr-2"></i>Font Size:</span>
                            <input type="text" size="10" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                          </div>
                          
                          <div className="col-sm">
                          <span className="tag__item play blue">
                          <i className="fas fa-play mr-2"></i>Font Color:
                        </span>
                            <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
                          </div>
                          <div className="col-sm">      
      <button className="tag__item" onClick={undo}>Undo</button>
      <button  className="tag__item" onClick={redo}>Redo</button>
       </div> </div>
                      {applyStyles()}
                      </div>
                   
                </div>
            </article>
            
        </div>
    </section>
    </div>
  );
};

export default TextStyler;