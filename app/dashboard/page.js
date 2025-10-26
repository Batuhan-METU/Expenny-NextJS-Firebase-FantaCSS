"use client";

import Login from "@/components/Login";
import SubscriptionSummary from "@/components/SubsciptionSummary";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useState } from "react";

const blankSubscription = {
  name: "",
  category: "Web Services",
  cost: "",
  currency: "USD",
  billingFrequency: "Montly",
  nextBillingData: "",
  paymentMethod: "Credit Card",
  startDate: "",
  renewalType: "",
  notes: "",
  status: "Active",
};

export default function DashboardPage() {
  const [isAddEntry, setIsAddEntry] = useState(false);

  const [formData, setFormData] = useState(blankSubscription);

  const handleResetForm = () => {
    setFormData(blankSubscription);
  };

  const { handleDeleteSub, userData, currentUser, loading } = useAuth();
  const isAuthenticated = !!currentUser;

  const handleChangeInput = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };

    setFormData(newData);
  };

  const handleEditSub = async (index) => {
    const data = userData.subscriptions[index];
    setFormData(data);
    await handleDeleteSub(index);
    setIsAddEntry(true);
  };

  const handleToggleInput = () => {
    setIsAddEntry(!isAddEntry);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    );
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay
        handleEditSub={handleEditSub}
        handleShowInput={isAddEntry ? () => {} : handleToggleInput}
      />
      {isAddEntry && (
        <SubscriptionForm
          handleResetForm={handleResetForm}
          closeInput={handleToggleInput}
          formData={formData}
          handleChangeInput={handleChangeInput}
        />
      )}
    </>
  );
}
