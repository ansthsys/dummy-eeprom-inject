import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [feeders, setFeeders] = useState(data);
  const [histories, setHistories] = useState([]);
  const [readFeeder, setReadFeeder] = useState({
    feeder_barcode: "",
    feeder_name: "",
    feeder_token: "",
    feeder_uuid: "",
    feeder_jwt: "",
    feeder_type: "",
    feeder_version: "",
  });

  function injectFeeder(prop) {
    const newFeeders = feeders.map((feeder) => {
      if (feeder.feeder_name === prop.feeder_name) {
        feeder.feeder_status = true;

        const newHistory = {
          datetime: new Date().toLocaleString(),
          feeder_name: feeder.feeder_name,
        };

        setHistories((prev) => {
          return [...prev, newHistory];
        });
      }

      return feeder;
    });

    setFeeders(newFeeders);
  }

  useEffect(() => {}, [feeders, histories]);

  return (
    <div>
      <div>
        <h1>Feeders</h1>
        <br />
        <table cellPadding={3} border={1}>
          <thead>
            <tr>
              <td>Barcode</td>
              <td>Name</td>
              <td>Token</td>
              <td>UUID</td>
              <td>JWT</td>
              <td>Type</td>
              <td>Version</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {feeders.map((feeder, index) => {
              return (
                <tr key={feeder.feeder_uuid + index}>
                  <td>{feeder.feeder_barcode}</td>
                  <td>{feeder.feeder_name}</td>
                  <td>{feeder.feeder_token}</td>
                  <td>{feeder.feeder_uuid}</td>
                  <td>{feeder.feeder_jwt}</td>
                  <td>{feeder.feeder_type}</td>
                  <td>{feeder.feeder_version}</td>
                  <td>{feeder.feeder_status ? "Injected" : "Available"}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: feeder.feeder_status ? "red" : "green",
                        color: "black",
                        margin: 0,
                        padding: "5px 10px",
                      }}
                      disabled={feeder.feeder_status}
                      onClick={() => injectFeeder(feeder)}
                    >
                      Inject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1>Feeder Histori</h1>
          <br />
          <table cellPadding={3} border={1}>
            <thead>
              <tr>
                <td>No</td>
                <td>Date Time</td>
                <td>Feeder Name</td>
              </tr>
            </thead>
            <tbody>
              {histories.map((history, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{history.datetime}</td>
                    <td>{history.feeder_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <h1>Feeder Status</h1>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <p>Feeder Barcode: {readFeeder.feeder_barcode}</p>
            <p>Feeder Name:{readFeeder.feeder_name}</p>
            <p>Feeder Token:{readFeeder.feeder_token}</p>
            <p>Feeder UUID:{readFeeder.feeder_uuid}</p>
            <p>Feeder JWT:{readFeeder.feeder_jwt}</p>
            <p>Feeder Type:{readFeeder.feeder_type}</p>
            <p>Feeder Version:{readFeeder.feeder_version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
