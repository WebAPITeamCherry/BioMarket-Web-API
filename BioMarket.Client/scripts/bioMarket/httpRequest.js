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

		var postJSON = function(url, contentType, acceptType, data, token) {
			var deferred = Q.defer(),
				type = 'POST';

			Q.stopUnhandledRejectionTracking();

			$.ajax({
				beforeSend : function( xhr ) {
					xhr.setRequestHeader( "Content-Type", "application/json");
					xhr.setRequestHeader( "Authorization", "bearer " + token);
				},
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

		var uploadPhoto = function(photo) {
			var deferred = Q.defer(),
				type = 'POST';

			Q.stopUnhandledRejectionTracking();
			
			$.ajax({
				url: 'https://api.cloudinary.com/v1_1/dj8rvw7c9/image/upload',
				type: 'Post',
				method: 'Post',
				data: photo,
				success: function (data) {
					deferred.resolve(data);
				},
				error: function (err) {
					deferred.reject(err);
				}
			});

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
			putJSON: putJSON,
			uploadPhoto : uploadPhoto
		};
	}());
	return httpRequest;
});