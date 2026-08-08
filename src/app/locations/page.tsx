import { SiteChrome } from "@/components/site/site-chrome";
import { LocationsPage } from "@/components/pages/locations-page";

export const metadata = {
  title: "Locations — Hyderabad, Chennai, Bangalore",
  description:
    "Locally based pest control teams in Hyderabad, Chennai and Bangalore. 30-min response, certified technicians, in-city coverage.",
};

export default function Locations() {
  return (
    <SiteChrome>
      <LocationsPage />
    </SiteChrome>
  );
}
