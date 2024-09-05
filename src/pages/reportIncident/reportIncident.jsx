import React from "react";
import { useForm } from "react-hook-form";

function Report() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="new-campaign-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create a New Campaign</h1>

        {/* Campaign Title */}
        <div className="form-group">
          <label>Campaign Title *</label>
          <input
            type="text"
            {...register("campaignTitle", {
              required: "Campaign Title is required",
            })}
          />
          {errors.campaignTitle && (
            <p className="error">{errors.campaignTitle.message}</p>
          )}
        </div>

        {/* Required Fund */}
        <div className="form-group">
          <label>Required Fund (in MATIC) *</label>
          <input
            type="number"
            {...register("campaignAmount", {
              required: "Campaign Amount is required",
            })}
          />
          {errors.campaignAmount && (
            <p className="error">{errors.campaignAmount.message}</p>
          )}
        </div>

        {/* Campaign Description */}
        <div className="form-group">
          <label>Tell Your Story *</label>
          <textarea
            rows="7"
            {...register("campaignDescription", {
              required: "Campaign Description is required",
            })}
          ></textarea>
          {errors.campaignDescription && (
            <p className="error">{errors.campaignDescription.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="form-group">
          <label>End Date *</label>
          <input
            type="date"
            {...register("campaignDeadline", {
              required: "Campaign Deadline is required",
            })}
          />
          {errors.campaignDeadline && (
            <p className="error">{errors.campaignDeadline.message}</p>
          )}
        </div>

        {/* Campaign Category */}
        <div className="form-group">
          <label>Campaign Category *</label>
          <select
            {...register("campaignCategory", {
              required: "Campaign Category is required",
            })}
          >
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Hurricane">Hurricane</option>
            <option value="Tsunami">Tsunami</option>
            <option value="Wildfire">Wildfire</option>
            <option value="Tornado">Tornado</option>
            <option value="Volcanic Eruption">Volcanic Eruption</option>
            <option value="Drought">Drought</option>
            <option value="Landslide">Landslide</option>
            <option value="Cyclone">Cyclone</option>
            <option value="Blizzard">Blizzard</option>
            <option value="Heatwave">Heatwave</option>
            <option value="Storm Surge">Storm Surge</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Severe Thunderstorm">Severe Thunderstorm</option>
          </select>
          {errors.campaignCategory && (
            <p className="error">{errors.campaignCategory.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Campaign Image *</label>
          <input
            type="file"
            accept="image/*"
            {...register("campaignImage", {
              required: "Campaign Image is required",
            })}
          />
          {errors.campaignImage && (
            <p className="error">{errors.campaignImage.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Campaign</button>
      </form>
    </div>
  );
}

export default Report;
