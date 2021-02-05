import React from 'react';

const footer = ( props ) => (
<footer className="footer">
<div className="container-fluid">
    <div className="row">
        <div className="col-12">
          {new Date().getFullYear() - 1} - {new Date().getFullYear()} © Created by Mabro Team 
        </div>
    </div>
</div>
</footer>
);

export default footer;
