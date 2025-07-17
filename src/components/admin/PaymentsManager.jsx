import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  DollarIcon,
  PhoneIcon,
  CheckIcon,
  AlertIcon,
  ClockIcon,
} from "../ui/Icons";

// Demo payments data
const demoPayments = [
  {
    id: "PMT001",
    phoneNumber: "+254712345678",
    planName: "1 Day",
    amount: 150,
    currency: "KES",
    status: "completed",
    mpesaReceiptNumber: "QHF234K9W2",
    paymentMethod: "M-Pesa",
    createdAt: "2025-01-02T10:30:00Z",
    paidAt: "2025-01-02T10:30:45Z",
    duration: "24 Hours",
    dataLimit: "5 GB",
  },
  {
    id: "PMT002",
    phoneNumber: "+254723456789",
    planName: "1 Hour",
    amount: 20,
    currency: "KES",
    status: "completed",
    mpesaReceiptNumber: "QHF234L8X1",
    paymentMethod: "M-Pesa",
    createdAt: "2025-01-02T09:15:00Z",
    paidAt: "2025-01-02T09:15:30Z",
    duration: "1 Hour",
    dataLimit: "500 MB",
  },
  {
    id: "PMT003",
    phoneNumber: "+254734567890",
    planName: "1 Week",
    amount: 800,
    currency: "KES",
    status: "processing",
    mpesaReceiptNumber: null,
    paymentMethod: "M-Pesa",
    createdAt: "2025-01-02T11:45:00Z",
    paidAt: null,
    duration: "7 Days",
    dataLimit: "25 GB",
  },
  {
    id: "PMT004",
    phoneNumber: "+254745678901",
    planName: "1 Day",
    amount: 150,
    currency: "KES",
    status: "failed",
    mpesaReceiptNumber: null,
    paymentMethod: "M-Pesa",
    createdAt: "2025-01-02T08:20:00Z",
    paidAt: null,
    duration: "24 Hours",
    dataLimit: "5 GB",
  },
  {
    id: "PMT005",
    phoneNumber: "+254756789012",
    planName: "1 Month",
    amount: 2500,
    currency: "KES",
    status: "completed",
    mpesaReceiptNumber: "QHF234M7Y3",
    paymentMethod: "M-Pesa",
    createdAt: "2025-01-01T16:30:00Z",
    paidAt: "2025-01-01T16:31:15Z",
    duration: "30 Days",
    dataLimit: "Unlimited",
  },
];

export const PaymentsManager = () => {
  const [payments, setPayments] = useState(demoPayments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckIcon size={16} className="text-success-600" />;
      case "processing":
        return <ClockIcon size={16} className="text-warning-600" />;
      case "failed":
        return <AlertIcon size={16} className="text-danger-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-success-100 text-success-700";
      case "processing":
        return "bg-warning-100 text-warning-700";
      case "failed":
        return "bg-danger-100 text-danger-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.phoneNumber.includes(searchTerm) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const todayRevenue = payments
    .filter(
      (p) =>
        p.status === "completed" &&
        new Date(p.paidAt).toDateString() === new Date().toDateString()
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <DollarIcon size={24} className="text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  KSH {totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarIcon size={24} className="text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Today's Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  KSH {todayRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckIcon size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter((p) => p.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <ClockIcon size={24} className="text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter((p) => p.status === "processing").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by phone number, payment ID, or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<PhoneIcon size={16} />}
              />
            </div>

            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Payment ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">{payment.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{payment.phoneNumber}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium">{payment.planName}</span>
                        <p className="text-xs text-gray-500">
                          {payment.duration}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">
                        KSH {payment.amount}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`status-badge ${getStatusColor(
                          payment.status
                        )} flex items-center`}
                      >
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">
                          {payment.status}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{formatDate(payment.createdAt)}</div>
                        {payment.paidAt && (
                          <div className="text-xs text-gray-500">
                            Paid: {formatDate(payment.paidAt)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Payment ID
                  </label>
                  <p className="font-mono text-sm">{selectedPayment.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <p className="font-medium">{selectedPayment.phoneNumber}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Plan Details
                  </label>
                  <p className="font-medium">{selectedPayment.planName}</p>
                  <p className="text-sm text-gray-500">
                    {selectedPayment.duration} • {selectedPayment.dataLimit}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Amount
                  </label>
                  <p className="font-semibold text-lg">
                    KSH {selectedPayment.amount}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <span
                    className={`status-badge ${getStatusColor(
                      selectedPayment.status
                    )} flex items-center w-fit`}
                  >
                    {getStatusIcon(selectedPayment.status)}
                    <span className="ml-1 capitalize">
                      {selectedPayment.status}
                    </span>
                  </span>
                </div>

                {selectedPayment.mpesaReceiptNumber && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      M-Pesa Receipt
                    </label>
                    <p className="font-mono text-sm">
                      {selectedPayment.mpesaReceiptNumber}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Created At
                  </label>
                  <p className="text-sm">
                    {formatDate(selectedPayment.createdAt)}
                  </p>
                </div>

                {selectedPayment.paidAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Paid At
                    </label>
                    <p className="text-sm">
                      {formatDate(selectedPayment.paidAt)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedPayment(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
