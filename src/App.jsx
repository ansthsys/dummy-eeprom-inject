import { useEffect, useState } from "react";
import "./App.css";
// import { socket } from "./socket";
// import { data } from "./data";

function App() {
  // const [time, setTime] = useState(null);
  const [feeders, setFeeders] = useState([]);
  const [histories, setHistories] = useState([]);
  const [readFeeder, setReadFeeder] = useState({
    barcode: "",
    name: "",
    token: "",
    uuid: "",
    jwt: "",
    type: "",
    version: "",
  });
  const URL_GET = "https://8226-103-129-95-34.ngrok-free.app";
  const URL_EEPROM = "https://6fe4-103-129-95-34.ngrok-free.app";

  function injectFeeder(prop) {
    console.log(typeof prop, prop);
    fetch(`${URL_EEPROM}/write_data`, {
      method: "POST",
      headers: {
        // "ngrok-skip-browser-warning": "true", // Header setting for request to ngrok free
        // "User-Agent": "MyCustomUserAgent", // Header setting for request to ngrok free
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prop),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        initData();

        console.log(prop.name);

        const newHistory = {
          datetime: new Date().toLocaleString(),
          name: prop.name,
        };

        setHistories((prev) => {
          return [...prev, newHistory];
        });
      })
      .catch((err) => console.log(err));
  }

  function readData() {
    fetch(`${URL_EEPROM}/read_data`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true", // Header setting for request to ngrok free
        "User-Agent": "MyCustomUserAgent", // Header setting for request to ngrok free
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setReadFeeder(res.data);
      })
      .catch((err) => console.log(err));

    console.log(readFeeder);
  }

  // function initSocket() {
  //   socket.on("connect", () => {
  //     console.log("ws connected: ", socket.connected);
  //     console.log("connection id: ", socket.id);
  //   });

  //   socket.on("connect_error", () => {
  //     console.log("ws connect error: ", socket.connected);
  //     setTimeout(() => socket.connect(), 60000);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("ws disconnected: ", socket.connected);
  //   });

  //   // Socket Data
  //   socket.on("eeprom", (data) => {
  //     setReadFeeder(data);
  //   });

  //   socket.on("time", (data) => {
  //     setTime(data);
  //   });
  // }

  function initData() {
    fetch(`${URL_GET}/eeprom`, {
      headers: {
        "ngrok-skip-browser-warning": "true", // Header setting for request to ngrok free
        "User-Agent": "MyCustomUserAgent", // Header setting for request to ngrok free
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFeeders(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    initData();
  }, [readFeeder]);

  return (
    <div>
      {/* <div>Current Time: {time}</div> */}
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
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {feeders.map((feeder, index) => {
              return (
                <tr key={index}>
                  <td>{feeder.barcode}</td>
                  <td>{feeder.name}</td>
                  <td>{feeder.token}</td>
                  <td>{feeder.uuid}</td>
                  <td>{feeder.jwt}</td>
                  <td>{feeder.type}</td>
                  <td>{feeder.version}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "black",
                        margin: 0,
                        padding: "5px 10px",
                      }}
                      disabled={feeder.status}
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
        <div
          style={{
            flexBasis: "60%",
          }}
        >
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
                    <td>{history.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          style={{
            flexBasis: "40%",
            textAlign: "left",
          }}
        >
          <h1>Feeder Status</h1>
          <button
            onClick={readData}
            style={{
              backgroundColor: "lightblue",
            }}
          >
            Read
          </button>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <p>Feeder Barcode: {readFeeder.Barcode}</p>
            <p>Feeder Name: {readFeeder.Name}</p>
            <p>Feeder Token: {readFeeder.Token}</p>
            <p>Feeder UUID: {readFeeder.Uuid}</p>
            <p>Feeder JWT: {readFeeder.Jwt}</p>
            <p>Feeder Type: {readFeeder.Type}</p>
            <p>Feeder Version: {readFeeder.Version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
