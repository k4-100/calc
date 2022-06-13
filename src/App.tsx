import React from 'react';
import CustomTable from './components/CustomTable/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import './dist/css/compiled/main.css';

const App: React.FC = () => {
  return (
    <div className="App">
        <h1>
            <CustomTable />
        </h1>
    </div>
  );
};

export default App
