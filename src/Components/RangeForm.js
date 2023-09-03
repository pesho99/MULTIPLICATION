import { useState } from "react";
  

  export default function RangeForm({min, max, onValueChanged}) {

    const [minValue, setMin] = useState(min);
    const [maxValue, setMax] = useState(max);
    
    return <form className="form-inline" onSubmit={HandleSubmit}>
      <div className="form-group">
        <label className="mr-1" for="mininput">От: </label>
        <input className="form-control x-sm-m3" id="mininput" value={minValue} onChange={(e) => setMin(Number(e.target.value))} />
        <label className="mr-1 ml-4">До:</label>
        <input className="form-control x-sm-3" value={maxValue} onChange={(e) => setMax(Number(e.target.value))} />
        <button className="btn btn-primary btn-sm ml-3">Нов</button>
      </div>
    </form>;

    function HandleSubmit(e)
    {
      e.preventDefault();
      onValueChanged(minValue, maxValue);
    }
  }