import { useAuth } from "@/context/AuthContext";
import { getDaysUntilNextCharge, subscriptions } from "@/utils";

export default function SubscriptionsDisplay(props) {
  const { handleShowInput, handleEditSub } = props;
  const { handleDeleteSub, userData } = useAuth();

  if (!userData?.subscriptions) {
    return null;
  }

  return (
    <section>
      <h2>Your Subscriptions</h2>
      <div className="card-container">
        {userData.subscriptions.map((sub, subIndex) => {
          const {
            name,
            category,
            cost,
            currency,
            billingFrequency,
            startDate,
            notes,
            status,
          } = sub;

          return (
            <div key={subIndex} className="card subscription-card">
              <div>
                <h3>{name}</h3>
                <div
                  className={
                    "status " +
                    (status === "Active"
                      ? " card-button-primary"
                      : " card-button-secondary")
                  }
                >
                  <small>{status}</small>
                </div>
              </div>

              <p>
                <i>{category}</i>
              </p>
              <div className="sub-cost">
                <h2>${cost}</h2>
                <p>{currency}</p>
              </div>
              <small>Per {billingFrequency}</small>
              <div className="sub-renewal">
                <div>
                  <h4>Started</h4>
                  <p>{startDate}</p>
                </div>
                <div>
                  <h5>Due</h5>
                  <p>{getDaysUntilNextCharge(startDate, billingFrequency)}</p>
                </div>
                <p>{notes}</p>
              </div>
              <div className="white-line" />
              <div className="subscription-actions">
                <button
                  className="button-card"
                  onClick={() => {
                    handleEditSub(subIndex);
                  }}
                >
                  Edit
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="button-card"
                  onClick={() => {
                    handleDeleteSub(subIndex);
                  }}
                >
                  Delete
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
        <div className="adding-div">
          {" "}
          <button
            onClick={handleShowInput}
            className="button-card add-subscriptions"
          >
            <i className="fa-solid fa-plus"></i>
            <h3>Add New Subscription</h3>
          </button>
        </div>
      </div>
    </section>
  );
}
