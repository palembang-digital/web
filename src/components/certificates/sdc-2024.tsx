export default function SDC2024({
  recipient,
  role,
  minimal,
}: {
  recipient: string;
  role: string;
  minimal: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      {!minimal && (
        <img
          width="1123"
          src="https://www.palembangdigital.org/images/certificates/sdc-2024/songket-pattern.png"
          style={{
            position: "absolute",
          }}
        />
      )}
      {!minimal && (
        <img
          width="1123"
          src="https://www.palembangdigital.org/images/certificates/sdc-2024/radial.png"
          style={{
            position: "absolute",
          }}
        />
      )}
      {!minimal && (
        <img
          width="1123"
          src="https://www.palembangdigital.org/images/certificates/sdc-2024/circuit-pattern.png"
          style={{
            position: "absolute",
            bottom: 0,
          }}
        />
      )}
      <img
        width="240"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/organizers-logo.png"
        style={{
          position: "absolute",
          left: 441,
          top: 32,
        }}
      />

      <img
        width="850"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/certificate-title.png"
        style={{
          position: "absolute",
          left: 136,
          top: 118,
        }}
      />

      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#555555",
          width: "100%",
          height: "100%",
          paddingBottom: 200,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <p>Diberikan kepada</p>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 42,
          color: "black",
          width: "100%",
          height: "100%",
          paddingBottom: 90,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <p>{recipient}</p>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#555555",
          width: "100%",
          height: "100%",
          paddingTop: 70,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <p>Atas partisipasinya sebagai {role} dalam kegiatan:</p>
      </div>

      <img
        width="700"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/sdc-2024.png"
        style={{
          position: "absolute",
          left: 211,
          top: 460,
        }}
      />

      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#555555",
          width: "100%",
          height: "100%",
          paddingTop: 243,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <p>Yang diselenggarakan pada tanggal 14-15 Desember 2024</p>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#555555",
          width: "100%",
          height: "100%",
          paddingTop: 305,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <p>di Telkom Indonesia Witel Sumbagsel</p>
      </div>

      <img
        width="600"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/signatures.png"
        style={{
          position: "absolute",
          left: 261,
          top: 635,
        }}
      />

      <img
        width="600"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/edge-top-left.png"
        style={{
          position: "absolute",
        }}
      />

      <img
        width="600"
        src="https://www.palembangdigital.org/images/certificates/sdc-2024/edge-bottom-right.png"
        style={{
          position: "absolute",
          right: -1,
          bottom: -1,
        }}
      />
    </div>
  );
}
