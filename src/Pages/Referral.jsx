import React, { useEffect, useState } from "react";

const ReferralTable = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingTxId, setPayingTxId] = useState(null);

  const fetchReferrals = () => {
    setLoading(true);
    fetch("http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/referrals/all")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        if (data.success) setReferrals(data.referrals);
        else setError("Failed to fetch referrals");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handlePay = async (referralId, transactionId) => {
    setPayingTxId(transactionId);
    try {
      const res = await fetch("http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/referrals/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralId, transactionId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      const data = await res.json();
      alert(data.message || "Payment status updated");
      fetchReferrals();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setPayingTxId(null);
    }
  };

  if (loading) return <p>Loading referrals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 20 }}>Referral Records</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={thStyle}>Referral ID</th>
            <th style={thStyle}>Referral Code</th>
            <th style={thStyle}>User ID</th>
            <th style={thStyle}>Total Amount</th>
            <th style={thStyle}>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <tr key={referral._id} style={rowStyle}>
              <td style={tdStyle}>{referral._id}</td>
              <td style={tdStyle}>{referral.referralCode || "-"}</td>
              <td style={tdStyle}>{referral.userId || "-"}</td>
              <td style={tdStyle}>₹{referral.totalAmount}</td>
              <td style={tdStyle}>
                {referral.transactions.length === 0 ? (
                  <em style={{ color: "#888" }}>No transactions</em>
                ) : (
                  <table style={nestedTableStyle}>
                    <thead>
                      <tr style={{ backgroundColor: "#f1f1f1" }}>
                        <th style={nestedThStyle}>Amount</th>
                        <th style={nestedThStyle}>Account</th>
                        <th style={nestedThStyle}>IFSC</th>
                        <th style={nestedThStyle}>Bank</th>
                        <th style={nestedThStyle}>Mobile</th>
                        <th style={nestedThStyle}>Status</th>
                        <th style={nestedThStyle}>Date</th>
                        <th style={nestedThStyle}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referral.transactions.map((tx) => {
                        const isDisabled = tx.activeStatus === "paid" || payingTxId === tx._id;
                        return (
                          <tr key={tx._id} style={nestedRowStyle}>
                            <td style={nestedTdStyle}>₹{tx.amount}</td>
                            <td style={nestedTdStyle}>{tx.accNumber}</td>
                            <td style={nestedTdStyle}>{tx.ifscCode}</td>
                            <td style={nestedTdStyle}>{tx.bankName}</td>
                            <td style={nestedTdStyle}>{tx.mobileNumber}</td>
                            <td style={nestedTdStyle}>{tx.activeStatus}</td>
                            <td style={nestedTdStyle}>{new Date(tx.date).toLocaleString()}</td>
                            <td style={nestedTdStyle}>
                              <button
                                onClick={() => handlePay(referral._id, tx._id)}
                                disabled={isDisabled}
                                style={{
                                  padding: "6px 12px",
                                  border: "none",
                                  borderRadius: 4,
                                  color: "#fff",
                                  backgroundColor: isDisabled ? "#aaa" : "#28a745",
                                  cursor: isDisabled ? "not-allowed" : "pointer",
                                  transition: "background 0.3s",
                                }}
                              >
                                {tx.activeStatus === "paid"
                                  ? "Paid"
                                  : payingTxId === tx._id
                                  ? "Processing..."
                                  : "Pay"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 0 12px rgba(0,0,0,0.05)",
};

const headerRowStyle = {
  backgroundColor: "#f8f8f8",
  textTransform: "uppercase",
};

const rowStyle = {
  borderBottom: "1px solid #e0e0e0",
};

const thStyle = {
  padding: "12px 10px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
  fontSize: "14px",
};

const tdStyle = {
  padding: "10px",
  verticalAlign: "top",
  fontSize: "14px",
};

const nestedTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const nestedThStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  fontSize: "13px",
};

const nestedTdStyle = {
  padding: "8px",
  fontSize: "13px",
};

const nestedRowStyle = {
  borderBottom: "1px solid #eee",
};

export default ReferralTable;
