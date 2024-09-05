import CampaignCard from "../../components/campaign-card/campaign-card"

const CampaignsPage = () => {
  return (
    <div className="max-w-[95vw] mx-auto grid grid-cols-2 mt-6 gap-4">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  )
}

export default CampaignsPage
