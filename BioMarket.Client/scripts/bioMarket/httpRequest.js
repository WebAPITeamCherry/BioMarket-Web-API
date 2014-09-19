define(['Q'], function (Q) {
	var httpRequest = (function () {
		var getJSON = function(url, acceptType) {
			var deferred = Q.defer();
			Q.stopUnhandledRejectionTracking();

			$.ajax({
				url: url,
				type: 'GET',
				acceptType : acceptType || '',
				success: function (data) {
					deferred.resolve(data);
				},
				error: function (err) {
					deferred.reject(err);
				}
			});

			return deferred.promise;
		};

		var postJSON = function(url, contentType, acceptType, data) {
			var deferred = Q.defer(),
				type = 'POST';

			Q.stopUnhandledRejectionTracking();

/*			$.ajax({
				beforeSend : function( xhr ) {
					xhr.setRequestHeader( "Authorization", "bearer " + token );
				},
				url : url,
				type : type,
				method : type,
				dataType : "json",
				ContentType: "application/x-www-form-urlencoded; application/json; charset=utf-8",
				AcceptType: acceptType,
				data : data,
				success: function (data) {
					deferred.resolve(data);
				},
				error: function (err) {
					deferred.reject(err);
				}
			});*/


			var requestOptions = {
				url: url,
				type: type,
				//dataType: "application/x-www-form-urlencoded",
				data: data,
				beforeSend: function (xhr) {
					var token = localStorage.getItem("bioMarketAccessToken");

					if (token !== null) {
						//xhr.withCredentials = true;
						xhr.setRequestHeader("Authorization", "Bearer " + token);
					}
				},
				success: function resolveDeferred(requestData) {
					deferred.resolve(requestData);
				},
				error: function rejectDeferred(errorData) {
					deferred.reject(errorData.responseText);
				}
			};

			requestOptions.contentType = "application/json; charset=utf-8";

			$.ajax(requestOptions);

			return deferred.promise;
		};

		var putJSON = function (url, contentType, acceptType, data, sessionKey) {
			var deferred = Q.defer(),
				type = 'PUT';

			Q.stopUnhandledRejectionTracking();

			$.ajax({
				url: url,
				type: type,
				method: type,
				dataType: "json",
				ContentType: "application/json; charset=utf-8",
				AcceptType: acceptType,
				data: data,
				success: function (data) {
					deferred.resolve(data);
				},
				error: function (err) {
					deferred.reject(err);
				}
			});

			return deferred.promise;
		};

		return {
			getJSON: getJSON,
			postJSON: postJSON,
			putJSON: putJSON
		};
	}());
	return httpRequest;
});