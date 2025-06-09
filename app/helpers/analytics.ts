// analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-JG33DNK0N3");
};

export const trackPageView = (url: string) => {
    ReactGA.send({ hitType: "pageview", page: url });
};
