


import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(3, 'First name minimum 3 characters'),
  lastName: z.string().min(3).optional(),
  emailId: z.string().email('Invalid email'),
  age: z.number().min(6).max(80).optional(),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6, 'Password minimum 6 characters'),
  bio: z.string().max(500).optional(),
  verified: z.boolean(),
  title: z.string().max(50).optional(),
  skills: z.array(z.string().min(1)).optional(),
  phone: z.string().max(25).optional(),
  location: z.string().max(100).optional(),
  memberSince: z.string().max(30).optional(),
  available: z.boolean(),
  stats: z.object({
    projects: z.number().min(0).optional(),
    followers: z.number().min(0).optional(),
    rating: z.number().min(0).max(5).optional(),
  }).optional(),
  activities: z.array(z.string().min(1)).optional(),
  problemSolved: z.array(z.string()).optional()
});

function UserProfileUpdatePanel({ user, onSubmit }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user,
      skills: user.skills?.length ? user.skills : [''],
      activities: user.activities?.length ? user.activities : [''],
      stats: user.stats || { projects: 0, followers: 0, rating: 0 },
      problemSolved: user.problemSolved || []
    },
  });

  const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: activityFields, append: activityAppend, remove: activityRemove } = useFieldArray({
    control,
    name: 'activities'
  });

  const onFormSubmit = data => {
    onSubmit(data);
  };

  return (
    <div className="fixed  top-0 left-140 h-full w-[63vw] bg-gradient-to-t from-blue-400 via-purple-500 to-pink-400 shadow-xl overflow-auto ">
      <div className="max-w-full mx-auto py-8 px-6 text-white">
        <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-indigo-400 pb-2">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block mb-1 font-semibold">First Name *</label>
              <input
                {...register('firstName')}
                className={`w-full rounded-md px-4 py-2 text-indigo-900 border-2 ${
                  errors.firstName ? 'border-red-500' : 'border-indigo-300'
                } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              />
              {errors.firstName && <p className="text-red-400 mt-1 text-sm">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">Last Name</label>
              <input
                {...register('lastName')}
                className={`w-full rounded-md px-4 py-2 text-indigo-900 border-2 ${
                  errors.lastName ? 'border-red-500' : 'border-indigo-300'
                } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
              />
              {errors.lastName && <p className="text-red-400 mt-1 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">Email *</label>
              <input
                {...register('emailId')}
                readOnly
                className="w-full rounded-md px-4 py-2 text-gray-600 border-2 border-indigo-500 bg-indigo-200 cursor-not-allowed"
                title="Email is immutable"
              />
              {errors.emailId && <p className="text-red-400 mt-1 text-sm">{errors.emailId.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password *</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter new password"
              className={`w-full rounded-md px-4 py-2 text-indigo-900 border-2 ${
                errors.password ? 'border-red-500' : 'border-indigo-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
            />
            {errors.password && <p className="text-red-400 mt-1 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role & Age */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Role</label>
              <select
                {...register('role')}
                className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-400 mt-1 text-sm">{errors.role.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-semibold">Age</label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              {errors.age && <p className="text-red-400 mt-1 text-sm">{errors.age.message}</p>}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-semibold">Bio</label>
            <textarea
              {...register('bio')}
              rows={3}
              className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
              placeholder="Tell us about yourself"
            ></textarea>
            {errors.bio && <p className="text-red-400 mt-1 text-sm">{errors.bio.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Senior Frontend Developer"
            />
            {errors.title && <p className="text-red-400 mt-1 text-sm">{errors.title.message}</p>}
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-3 font-semibold">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skillFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="flex items-center bg-indigo-300 rounded-md shadow-md px-3 py-1 w-max"
                >
                  <input
                    {...register(`skills.${idx}`)}
                    placeholder="Skill"
                    className="bg-indigo-300 text-indigo-900 border-0 focus:ring-0 outline-none w-auto px-1"
                  />
                  <button
                    type="button"
                    onClick={() => skillRemove(idx)}
                    className="ml-2 text-red-600 font-bold hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => skillAppend('')}
                className="ml-3 px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                + Add Skill
              </button>
            </div>
            {errors.skills && <p className="text-red-400 mt-1 text-sm">{errors.skills.message}</p>}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-400 mt-1 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Location</label>
              <input
                {...register('location')}
                className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="San Francisco, CA"
              />
              {errors.location && <p className="text-red-400 mt-1 text-sm">{errors.location.message}</p>}
            </div>
          </div>

          {/* Member Since */}
          <div>
            <label className="block mb-1 font-semibold">Member Since</label>
            <input
              {...register('memberSince')}
              className="w-full px-4 py-2 rounded-md text-indigo-900 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="January 2022"
            />
            {errors.memberSince && <p className="text-red-400 mt-1 text-sm">{errors.memberSince.message}</p>}
          </div>

          {/* Available & Verified */}
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('available')}
                className="w-5 h-5 rounded border-indigo-300 focus:ring-indigo-400"
              />
              <span>Available for projects</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('verified')}
                className="w-5 h-5 rounded border-indigo-300 focus:ring-indigo-400"
              />
              <span>Verified</span>
            </label>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold mt-6 mb-4">Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Projects</label>
                <input
                  type="number"
                  {...register('stats.projects', { valueAsNumber: true })}
                  min={0}
                  className="w-full px-4 py-2 rounded-md border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.stats?.projects && <p className="text-red-400 mt-1 text-sm">{errors.stats.projects.message}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Followers</label>
                <input
                  type="number"
                  {...register('stats.followers', { valueAsNumber: true })}
                  min={0}
                  className="w-full px-4 py-2 rounded-md border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.stats?.followers && <p className="text-red-400 mt-1 text-sm">{errors.stats.followers.message}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Rating</label>
                <input
                  type="number"
                  step={0.1}
                  {...register('stats.rating', { valueAsNumber: true })}
                  min={0}
                  max={5}
                  className="w-full px-4 py-2 rounded-md border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.stats?.rating && <p className="text-red-400 mt-1 text-sm">{errors.stats.rating.message}</p>}
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block font-semibold mt-6 mb-2">Recent Activities</label>
            <div className="flex flex-col gap-3">
              {activityFields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`activities.${idx}`)}
                    className="flex-grow px-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Activity"
                  />
                  <button
                    type="button"
                    className="text-red-600 font-bold text-xl hover:text-red-800"
                    onClick={() => activityRemove(idx)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => activityAppend('')}
              className="mt-3 px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition"
            >
              + Add Activity
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileUpdatePanel;

