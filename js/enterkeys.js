var bar_privakey = document.getElementById('load_privkey');

    UIkit.upload('.js-upload', {

        url: '',
        multiple: false,

        beforeSend: function () {
            console.log('beforeSend', arguments);
        },
        beforeAll: function () {
            console.log('beforeAll', arguments);
        },
        load: function () {
            console.log('load', arguments);
        },
        error: function () {
            console.log('error', arguments);
        },
        complete: function () {
            console.log('complete', arguments);
        },

        loadStart: function (e) {
            console.log('loadStart', arguments);

            bar_privakey.removeAttribute('hidden');
            bar_privakey.max = e.total;
            bar_privakey.value = e.loaded;
        },

        progress: function (e) {
            console.log('progress', arguments);

            bar_privakey.max = e.total;
            bar_privakey.value = e.loaded;
        },

        loadEnd: function (e) {
            console.log('loadEnd', arguments);

            bar_privakey.max = e.total;
            bar_privakey.value = e.loaded;
        },

        completeAll: function () {
            console.log('completeAll', arguments);

            setTimeout(function () {
                bar_privakey.setAttribute('hidden', 'hidden');
            }, 1000);

            alert('Upload Completed');
        }

    });

var bar_pubkey = document.getElementById('load_pubkey');

    UIkit.upload('.js-upload', {

        url: '',
        multiple: false,

        beforeSend: function () {
            console.log('beforeSend', arguments);
        },
        beforeAll: function () {
            console.log('beforeAll', arguments);
        },
        load: function () {
            console.log('load', arguments);
        },
        error: function () {
            console.log('error', arguments);
        },
        complete: function () {
            console.log('complete', arguments);
        },

        loadStart: function (e) {
            console.log('loadStart', arguments);

            bar_pubkey.removeAttribute('hidden');
            bar_pubkey.max = e.total;
            bar_pubkey.value = e.loaded;
        },

        progress: function (e) {
            console.log('progress', arguments);

            bar_pubkey.max = e.total;
            bar_pubkey.value = e.loaded;
        },

        loadEnd: function (e) {
            console.log('loadEnd', arguments);

            bar_pubkey.max = e.total;
            bar_pubkey.value = e.loaded;
        },

        completeAll: function () {
            console.log('completeAll', arguments);

            setTimeout(function () {
                bar_pubkey.setAttribute('hidden', 'hidden');
            }, 1000);

            alert('Upload Completed');
        }

    });
