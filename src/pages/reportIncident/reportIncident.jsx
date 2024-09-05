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
            {...register("campaignTitle", { required: "Campaign Title is required" })}
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
            {...register("campaignAmount", { required: "Campaign Amount is required" })}
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
            {...register("campaignDescription", { required: "Campaign Description is required" })}
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
            {...register("campaignDeadline", { required: "Campaign Deadline is required" })}
          />
          {errors.campaignDeadline && (
            <p className="error">{errors.campaignDeadline.message}</p>
          )}
        </div>

        {/* Campaign Category */}
        <div className="form-group">
          <label>Campaign Category *</label>
          <select
            {...register("campaignCategory", { required: "Campaign Category is required" })}
          >
            <option value="">Select a category</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            <option value="Justice">Justice</option>
            <option value="Relief">Relief</option>
            <option value="Arts">Arts</option>
            <option value="Technology">Technology</option>
            <option value="Community">Community</option>
            <option value="Animal">Animal</option>
            <option value="Sports">Sports</option>
            <option value="Humanitarian">Humanitarian</option>
            <option value="Development">Development</option>
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
            {...register("campaignImage", { required: "Campaign Image is required" })}
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
