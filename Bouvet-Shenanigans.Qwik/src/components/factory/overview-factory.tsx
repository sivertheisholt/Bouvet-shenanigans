import { component$ } from "@builder.io/qwik";
import Gauge from "../starter/gauge";
import { PowerButton } from "../buttons/power-button";
import { useFactoriesData } from "~/routes";

export const OverviewFactory = component$(() => {
  const factories = useFactoriesData();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px",
      }}
    >
      <h1>Factories</h1>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          columnGap: "300px",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Organic fertilizers
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Gauge
              value={parseInt(factories.value[0].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
            <div style={{ textAlign: "center", paddingLeft: "20px" }}>
              <PowerButton />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                1 Tonn /h
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Organic seeds and seedlings
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", paddingRight: "20px" }}>
              <PowerButton />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                1 Tonn /h
              </p>
            </div>
            <Gauge
              value={parseInt(factories.value[1].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          columnGap: "300px",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Pest and disease control
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Gauge
              value={parseInt(factories.value[2].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
            <div style={{ textAlign: "center", paddingLeft: "20px" }}>
              <PowerButton />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                1 Tonn /h
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Soil Amendments
          </p>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", paddingRight: "20px" }}>
              <PowerButton />
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Current</p>
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                1 Tonn /h
              </p>
            </div>
            <Gauge
              value={parseInt(factories.value[3].capacity.toFixed(1))}
              maxValueMultiplier={35}
              text="Tonn"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
