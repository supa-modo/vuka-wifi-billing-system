export const formatDate = (dateString) => {
    return  new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  export const formatDateWithTime = (dateStr, includeTime = false) => {
    if (!dateStr) return "N/A";
  
    const date = new Date(dateStr);
  
    if (isNaN(date.getTime())) return "Invalid date";
  
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    if (includeTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }
  
    return date.toLocaleDateString("en-US", options);
  };
  
  
  export const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Invalid date format:", error);
      return "";
    }
  };
  
  // Format date
  export const formatDate2 = (dateString, includeTime = false) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  

  // Get status badge color
  export const getStatusBadgeColor = (status) => {
    switch (status) {
      case "converted" :
        return "bg-green-100 border border-green-300 text-green-800";
      case "active" :
        return "bg-green-100 border border-green-300 text-green-800";
      case "inactive" :
        return "bg-red-100 border border-red-300 text-red-800";
      case  "declined":
        return "bg-red-100 border border-red-300 text-red-800";
      case "pending" :
        return "bg-yellow-100 border border-yellow-300 text-yellow-800";
      case "pending_renewal":
        return "bg-yellow-100 border border-yellow-300 text-yellow-800";
      default:
        return "bg-gray-100 border border-gray-300 text-gray-800";
    }
  };


  // Get badge color based on priority
  export const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-300";
      case "medium":
        return "bg-amber-100 text-yellow-800 border border-amber-300";
      case "low":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };