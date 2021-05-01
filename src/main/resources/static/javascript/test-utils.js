
async function encodeTestMessage() {
    try {
        // read public key
        let publicKeyExport = document.getElementById("publicKey").value;
        console.log('Public key: ' + publicKeyExport);
        let jwk = JSON.parse(publicKeyExport);
        let publicKey = await crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["encrypt"]
        );

        // read message
        let rawMessage = document.getElementById("message").value;
        console.log('Raw message: ' + rawMessage);

        // encode message
        let encoder = new TextEncoder();
        let encodedMessage = encoder.encode(rawMessage);
        let encryptedMessage = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            encodedMessage
        );

        // write message
        let base64Message = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedMessage)));
        console.log('Encrypted message: ' + base64Message);
        document.getElementById("encodedMessage").value = base64Message;
    } catch (e) {
        console.log("Exception: " + e);
    }
}

async function decodeTestMessage() {
    try {
        // read private key
        let privateKeyExport = document.getElementById("privateKey").value;
        console.log('Private key: ' + privateKeyExport);
        let jwk = JSON.parse(privateKeyExport);
        let privateKey = await crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["decrypt"]
        );

        // read message
        let encryptedMessage = document.getElementById("encodedMessage2").value;
        let encryptedMessageArrayBuffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0))
        console.log('Encrypted message: ' + encryptedMessage);

        // decode message
        let decryptedMessage = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            privateKey,
            encryptedMessageArrayBuffer
        );

        // write message
        let decoder = new TextDecoder();
        let decodedMessage = decoder.decode(decryptedMessage);
        console.log('Decrypted message: ' + decryptedMessage);
        document.getElementById("decodedMessage").value = decodedMessage;
    } catch (e) {
        console.log("Exception: " + e);
    }
}

function loadTestUsers() {
    try {

        let messengerAppData = {};
        if(localStorage.getItem("messengerAppData")) {
            messengerAppData = JSON.parse(localStorage.getItem("messengerAppData"));
        }
        if(!messengerAppData.userData) {
            messengerAppData.userData = {};
        }

        // franci
        messengerAppData.userData['' + 1] = {};
        messengerAppData.userData['' + 1].privateKey = '{"alg":"RSA-OAEP-256","d":"ARWbHmbFWFpP3oKyfbsV98BtZ02kcHzSeyZLPpbKdCCQBBziKvHfasnt29pHqn3DwHkfo6tGSzmLZ_fuHcOozE3QOEJ5WkGsQmByGMGgi8toEo5zikLtVR7_Rfugd2XG5vkjY3GhsaqlzJApSmLxOp7W-ZADpWUhhN0Ewkj6NlPsZC-UEk0SD-2uFgGTaCn_H1erBpVvjnR-7AqZEXXOCbXTTkhbyFUJd8b7P67See62C8Z1pm-HgsDTak4WnlzNJxmciSw8iY3g7yeeXIgg0YemAVZHBJVVbuo7L0IZorG7V401CdVLeTmRKwdi6A0JwXaxXJUHyY2m6DIvGMW1t7swoVUrwcTQZizAUlfvv8QT0wIobM9LKIBtFmnRYUGni2KmyWpAXjLkIcGgDnNwoayUDZ-vrwXUtn1axVOdvrj19nNN38iVDw9jqcNB5MmHDyhY59-iHwJJYrM0qwvhkGugAtjNJOkgb5Mw2ypScGdpqg6MWvQMjLwTpXVH8mSJJNMeyqzlaQXJU4W5nIqz8SbKJTDsk4kMB3jk5gqcQI89U9UPVUpJL4X_Q5OZLUc4avew1YYJlkyUn2gUJYGkp9-aEybetcVKlnZpins2mseSsi1a1n-vhrwy2E53jvWzcZ0bkIW7QpBGq6HG1qXxJmf6lxajkuj7Na_KM_qFQ10","dp":"OTYa1nJf-xQtcLTGkBClBbPzpwpH3S44JyP2JSU6VQ1s1lIoQY9fFJii2Uiz9rHXiW2PUdkosXVvamo3w_lZU8LkIcrO7zpYRiCLvbXTYxdiqBeFQSwbloUlwfRSixoe_Uhls3Kvy4iRTIMVATz8m7BpOTT6HXyusmr9rwWHgRRenrbeWGBVV58IVWEg5d1AtCazpez3wY3VugOzTcRi-dsvca3IR881fsUG7p4ixeU8d5qJ2cIFkyAAhcSjEGhDJGXqEQvGWudGippf88PFac8lPrAadNg9x8Be8jviRmlBmSMP5in8yIVWCYpGBu3rluYDDAJgU7-Psy4YUQWK3Q","dq":"Bhycc0N00BacWqMUZXKYfPPcKJhsmlrlynv2sRkj40dxxSEL0lA0gcZ4BTE9oMkqL4VdrhsSqk_-_K1zClPMf0yVjtOioqQ-nNwZQ9yrzsKdkhbeD2SZVfF2T9KKgoPmFlRpTFn8KW2sRP7sx7hrX0aL7fQ6zPBC8zjPfI6mNArGfVuCZ08W-jiJ9Kw_N7yj8ICHtCpapdVISBJo97OkgsjgE1u_otludEaEKp9WCATTYZuHi8OtiuzNw_3rut0VRE4xWtynsn67bgVNkcGaga2msPgUADLslSKvtobygePVTPxBb47goRsUiejt0k8WEOUCGPUp5ynXNzz-ScB2nQ","e":"AQAB","ext":true,"key_ops":["decrypt"],"kty":"RSA","n":"nW0OsjIp_Mj2mbiSkkkY-w6GecYR-iFhvygEY6PkSFQlt6iBYY3gNr1jfZreWWEXKMazy77Yo9P2vkPmgUsZAXmfTYtv3inZ3z5CVcu-9Lrf27QLHup7MtAb6g8UbDrGiwySIF6SUAkj-ngCgm6jtNZ47DW2d0iT1HdncZKDJ_ClO0D7yGE73FMl_tj-_YPSiXAFZZyt4UHQtHl5Z47m6xjQ1ncWkj_fpAqUtSJXKtnfR_-mp7Occo4VmZZFtIEuLxWCnJ2BfirOwjIOeHCbXrqstPQLOlMdbSsl_-goQvMcZJpTF_0hV2GyO18Ne067MxyeiDdjs89C1aR2N18FIl2rlSgWlyslPYPKY52PuOYqzyjoFd9Up7EIbeWTZ2zg4lEkbI_L2h7jhsIkD5pxXkNxEt65I7ASmCBbatoFez9AynbOHc_TbnzuL5dFjcKDLc6gYxh1yCfazLgwyr6Wv7NuwmpcscT_lNn4ICoS8EXijI_dPSa9sawkViQ2fzQnGaXN8QVp-cV7apZQaq0Ln2DyO0LDAUCWKG-3JMjcqndtCrJl-feoQ6BM8naqTDzSgYAnMILqnSFDONmIHGW9hNEz7K69juLh3Wrj9hrkN6qprQaFgOSqGv47pMz73uC-mop_QLqmxKe74ubq5aPpPHLGeQXZnekIhHKSVAu_Ips","p":"ySE0qGBTPQ57KiJSL7kZxE4E0em9CIPnky-PMIWU-ShtQHI7-ri8ywQxyu6FosENv_eNFDF4vnh5ECTxVh4ejmF_sYu5R0n0vvJuOFMRnhkui7dYsY01EhwEmg0woeMUrEBPCrBshEaYnA-C0c3R0DmiQdYGPatpJo5vJoW70CeLl2EaVBRK7Gw2AGeS5U5kfFpNPWR2TF_JnhRzs8DXTOdhwmK8Uir5FByIKnmwPhIatRb0AH4cB6gpmyo5lKh2mjPHFBojaVmjP95O6JGUeCOU23Z4v6HG0WvyTaeR88yV_bO3gnTgQfHc_oxzChQxnN-zWInu5B8jOFrm24ZUPw","q":"yF-blO0vMoLwJtvj5Lio_JY7vHTypzAK7zEy-jcxnU4gFuZhgLUwBYDvLiLwQGPCGtYFT5_Laj_xOxfpbqBxF9SRZ8GxJeQ-H9naWBmSDFksyNxKDepSiuxwWT3lwQt5j-E3jKaMiggoTDkWfmy8-8NztLf_IAYh_7aU_E20Rk3uWBuhl_J2Pi1bdv9YfXwNdwgYKkS_GHOHR-63ZunfRTQ7c56K5eIzMCX2q0k1UfFS6bSXBm6O_yXeCW_Dp3vayHqkUCtbdPo6PMvTUDCyr3fJhi57vs5Ifevf4h4ZdsJMLMP97Ve_dB3r5IawX-h79qkr6-1psdkd-iLF04eqpQ","qi":"e0cT_BgQRrCT6H0biSHRSTpY1ptQX3PQMLMECajsUq6T5Cs4wwxV2kbfb_RLBFaX11R6YhwBb6MOPkMRTTyA16uapiXeunVHWKmhx2rYbXkij3wfPlPsLINkuaR5nzZOwdnayAHkm6VMLwmJX9OqrPK8jxGJfDeCh9PuGO66pz9oozx_ui0bQcI2GcZXDWlpycsuSd3OpMc14vDLxplVWP33WhVSyEPk4ARW5xqaILvsfDGox7MNmKjJcnLxEmv8K4ZJxgQrkSoaTb1yMdx_ajAY0byrtJuv-V_9N3rPm1N_s0eYMwf18mW9ZyeFFqufUTdWSVWl13ip3nveXhPdTQ"}';

        // poldi
        messengerAppData.userData['' + 2] = {};
        messengerAppData.userData['' + 2].privateKey = '{"alg":"RSA-OAEP-256","d":"ESR-GE_L774eqhGhyd4Wt7zII768kBvqdMTdlYCUCqQn37WWTvTmWhXn2McLKDX17YtlimCoq9t2rBQk0GyRVvp5SyCFNzA8dCwER52gv6_GUlwyWb11Iuz2WSS7OO9zNlkYO81rz3F1TcZHdtblRY5pa7PwSeUjnzSgVWYMcuaORKogFX2zBOOtZrbPJFiwSCQPMLLyEaoE5BCUh_INMZ2z8ClghfBXD-7JuAYpv6YRg2160-hS9iXbpNEdBx69nRv2_Qbkn3iEQeREfy219Mbwx7qrIT6MakJR44KkwmRF5Sm-9r5ftfFfuylcI5drsdbpNYD6f9gwT63y6MaiRElo3aDYWBFC5q7JFkAFl5WfzVpA2Qv6uPFzmvXhibmNCr_YOsf3Cdvio8EU11E323BNOsg8JKQZX8VqCVKOpOmIdoSHu2QWHK6_de9moSxL7Kdm9MkudxBH3ztf7Z3OFFTnoC23ZdfiYgOJNm1Hbo8yuJ20fd0sDCTz2xHZCtgZnWWom1uocHb0VLCIyVK54CpV3W5JsJcnOQV2oNiVWn2yk89NboBmnpXVJt6Y_nzSVhoyvbBLzbdAmxh3yXeWRo2rqSwOunYqDkBk_U_rQCzpQjRAyCr4ooDn17Wtrb2MsSoyIOPTC9nrQlVxoM0i2ZZYOuZWkYf85zYnIzsfhsE","dp":"Ppue7JhZY6okNf_jFi1AVnhliO68C6NFaEaUrkW9E1AF-pdPIytZxvk59Af3YHS8uJf8-YddUHcEOs8iJCi7RbQ3V7y3GDXTwYpEPm2HOgT-mbMLbfBAMRbUS8ESlx-wpocLY-FmYU-9aUUhC5vud7d0WFLMsGL4MzkQDHAh6Q1Pducl6T8k0VHGv_iEBSSO9CddKEiv-bDFgqNGpfJ_LBOZ6CJikdUhlw_TEJskaL4vHQOaNOINE_CZ_x2v8zLBbVMAGC6vtMO3oVjUpmRE3H7y2OgOYr_mJGlNjHffeASRn1zIjxCXTYbelt8Zkro1nEw88YAGgRF0klm0ScS-YQ","dq":"XBxiqD2VMcsjYZG_Y8ddr02GuxKlPmVrBQlrBd18XdREH1-TS24GHq267fvbuCRFDUPLC8X47q9Il3ZPAMNZL_afYXB-rn-Wt9FAAGxX4wwQhcEQ9pY4deL3t7_VSBMtQKxTMMVgDlRKVjdCVzqR04po3hZ5wkpmFajama3R3o9BAQXBzioKo1WkuT-0Ea2As_3fXF4wzholFMilWmn3dK74bSRMrZrJ7h45ReH9iMtb8AehR3nJDVpD8KugD8Oj5iE38pfQfmL9eSnhTc2tf9mMs8pDYiE2AveLlxPZ-L_sTaLQ0g_KR9GquF-XAI95hEQoRLNfptVTW6v-5uWpAQ","e":"AQAB","ext":true,"key_ops":["decrypt"],"kty":"RSA","n":"uukLE2frn0eZ4FjAkoFvjCIGQw2hom2WeA38E3iAKerVTt1zBxxeH8MXyKui6Ibuok3sNQiSydH2CSC3KaizdNlvc96qlVHapPOCITzjRoqRbjbHuYwgruFWAU1ptKo9bZDthaT9PIsBEGPicoT-PbijjUbhcepdZOAMWi4Y-iIks3MvgPx_U-EiZdI7A_xSRv3J69bZC45vZg5QfzMajTQ1GrptBgKTpq5_yMxA8TlYG8-ruuzGiKS7CwKJxLnEjwsGP_HCiUvEbvhh2VurvAV5rV9dTRXjONYQwIf1vLrbKtHpeCE9ZZeeUg3gPy9ye7rACUrtXqz8xKaYkXgeB5BPC7_mNiBGDVdxQVfN06eQsFGsCAxfeGCO15dChji3e83kWLkK1gta6d3hfzT2S_BtwZho7sT4oHjB1FP8i4S3x5E0jcXkd85T8YG7pSLRg52PTDi8NzTRfXWidHrVVc7S3ljgWcPeVvCsoVVfKeDv7TTwmW1iyFboW95fiJcyXyD9eV9wum71E9M3V0by_mu064C2dWG1UDul8ENjlzhrRrN3Aqw84oN99zCZBGXDD_FA_3R7Ba2JjgdPh9szaycrv2lL7mkoUXvolmN2HAW8OR9CzngFLRsaUE09nNMSSZTj_OQMejFwkvC2E3Ry6u0ieSrMnQqFuXS8aY2djPU","p":"9rN-llaInqdXDzV1Mh8hbVsusGWKcQdH91GXp7-mvhPYRGwEWRDSmTpB9XCZT5v4UxD0klo9sEZChYgEutd6vh1CzPYCC8YQXgup8EQO5HuD29LDzTOQtKAo68PiU8SFk0QfsOWvBKZ121gze3WA-svaUSIvlF-vkHVGpEQxJkiI_gIq24Gh7l6xV8jlfVyJzN9jnJiR1Gva3YizbZvYkxE1QJbiJJEbZpgbGLkHFBxxNhk7HOEffe66q4YUs1PtSNdyz9XDOU-dE5Xy74OPOBXoepCsjpCy3CiqQ1DWgF63iIiOhxkYOpWsepumoZzhcHOk2C4tFavcmGp95gi-tQ","q":"wfSbMpH99HzNRePpJYeHo3Gn1MekztXdrAIbK4gg3LPqtdblaHht3G7jcJvltl5FK3f9wlpAluJZvh-0H5qdwMNsq987YJ1wjFqbXuNpcQvXN9hxX3Amhw1vyS8OcVBJ3FlCI6tBNOg34sweyFbupVPmaEooJSVpP-rQaeC1L-Ezjr7psVVRaFSOHykSI7434Kq3V0Pqpl622mA4Fn-ap6YXdYbwyFxQvuQP9Stsj-oxYPzRxGjCkUAzJtojKnB8DM67XiB3JsCyr0oUZVNdUZ5jZ2XzzA4ET7so8zJyAXaVJshaMBsUfm_RO2eZWeerrGnHrl7bAUIdjZDy1KQ9QQ","qi":"wV-sGIwcOqrIto-gKa2GLmDHPd_TpanTG0Brx_xFehofa3ZpJDgwdG37MfbD89ImXaAejV2wGGSy_G49cZ6P1GWDCvlY0rY6_hbYBmIiLOH5-UZGIxgfBHUOhdMXYr6FdJLiX086W13RAYp7qEXtJunMPTSdN-qXAlw-fS3BXAXSGd2BJEJqhnCp4GQfz-0qspeM-Up0YMrqAA5UgfVv-k83Ju1r0gIINRyLEFbYKGWVRlIo03SwgzqSnNY004N1eDjbhY2Lv5jJmmj0hS83s0B8udD7n12BwXXDy74g2WW3TKkpOADnfcBOqR_ImXJfEKsvPXA-IhthYaN5h7WNSQ"}';

        // micka
        messengerAppData.userData['' + 3] = {};
        messengerAppData.userData['' + 3].privateKey = '{"alg":"RSA-OAEP-256","d":"Dm-ACYfIe7aTbroH9ws3TZCxEoYYmhkb_fsKum5q9IhfoetKVjZum1wAjd17cwHQ2vM6gF3DilaAMBRBe9-_Sbkm3f6La1-IXimfQfYiNnY3bDkgkel-qXgH-fkuBrlgoT5FSsYfpraFFPnRStr5piNeQze0A6Hxfln60oDiDVrc-7OkRkvhAv_wQWQlPabQrKjmlZYisXYUKqV-k8jrhD0Gr_dyFhG2T_8TjnCliQ-WQ6cq7yrLLqzXzK1OszYfO0xI4x1YvCQ8MA98Phyc9o3h2VHlFRAcVsbnqatr_qqZLeO5fnwHU3ycUG2PlcQ4G-2EFFf7dVeU5sEN6QqEe_uxN9M7k_pHMfEqxP7_X4PlFeTmMRuxfgpLOuRo_qLx5eQpkxNC1GVUXUHAhTKgWR2ricQSl1JErY1L-nz6vAe4uFAWY1RyDALRzqcOiwEOFrDLce7v-w6lUikPJwyXA0jj7OszNcS6LgSGz1SKZfuNDzOw8HxuayRM5mGk1CdEKD6e2rsvllNRJqEEYerENZOasEFCr68MKkP4pmd-nHryPto7fOdOrHfMevy0UfnrZ_O7PRbCtJi9foTmUTbNtnPcZfM8ywqRTLK_hkNz7VUra_3sCT2gqdO-uc4GXCP52Ivmqbf0QJlpZdbE0j2Sqk1glWtWyJJy9H1CgZW77Ek","dp":"0Ldpwzl9jnXFTsYPe0E0RotspDZiADkGwWt79ScO4Jc5eAF29kewvs8vjELPyTcTqx5li1-DxBxMyUn8_GqnpoxHD7ToIBIUFi2WSD0QURoiMQB8jdvWRFFsJTHO7yt8YR-KrrePiB0zhl0T8TKO-MGY6EUlPWlatLkNzmzZBsKh0Qo39BveOvslGAFOhIduiopCRhv3CsXBkXliXgbXr4E5hG1BhQKY_bzNwxeoSzwKJWtuw1ehF6nIXnI8_n8GSWh536tPoz6T8Fk76155IXOhFDoopvKa7NDYReprt3ngzrcNEs1SzfwWBqX-lib4xvdsQMIwJi9BGDXKs98WCw","dq":"BtoZo7bZtuKAaeSLHE0iCbT4bDgv6Wpw40TIbp5EKZT-YhMOWIyscDvij8ywQXHKdeuQ8uER2jWeKUyPq5dI2cNTgs3llx9W53fCBcLI6-0BDSF8ckxl6kmaJwZ4TjcAchGBnyleRB1CeYh8sjA9uGWoYNtoEz4dT7_LhoQh761JGmhScm5IT1gBGdReTDpbTidiyrQz98guOzsmKrld9Eeu6zh_HfqHtCEGrvlq5T9FPqnu9MBLiLymNb53bfPafsY6W6daw-wR9DGs2MHCVvCKB3VhRDKRHi7AOKX5VW3TjOFrpADbA4fsMHtvbEd0UPvSHom82_g5nFxW45RyDQ","e":"AQAB","ext":true,"key_ops":["decrypt"],"kty":"RSA","n":"47FJ0E0EOGEMduENMI_TMbiRmojZYYPLczeuBdy4R6z03b0axVSk_Ed3Fry9Dq4bxdfLey4Ez-IWtYmtUvHWz2ox2oDbdW41dfzCq33ilf3GW5cPpumL-zyndo1Wzl187UN_qfPzPHPRouW1Pm4SLsPUSoyNa-GCc60ExiCwWYSMonL3rbH0t6nxawuvB1XYqKs8eM4MqtZjfL6Uz7n3E3D-JrNrPMyTupYvCstxaR5VWR5JtY4pXvJKJuJTdI9Wh6QV5aTtbFAd1rMQjId9k50yx_p6yohAAivlLB6pkCXxnNwKu8P6TUIZFCO8bmXGtZxPt8s_W48EhLXrzAaAcE7VZXyLezfQhVjwhL7l7FvBeQCegEeLJTQOETwV06hUI0x7_WbgfZGcOWFMW4HFxEnmrQLnjae0R69Rn80fsak78vZsCyErvE2MAwU1fLk4F-jMgaAJkYPzaaNpZv9ipoCcYuDefyp_ocjGqT04BY-FCtcBrKxLgkjCkBkaOe0k5QpMpjb4MUKV6IQ0FfF_WYbiDnS9jjvgG8o1SXgDL65FDbBMyCXJH4A5m_U1tnySKsT-u9My17erAvrLB058WMt9PKCTMcggIskM-zUrtYFETTquCa09pMvfhdYKJpTYvx6E0wPzAw9RRsjgQ6hd70pVjBX2it42rz4SZWPGBUc","p":"-mRJNcn0GzbLTB-myCFTY5Mgnl5mH6CCliVC6qZjBE6bGUlDYYuek8ERDOJJCd5PiMs7eI5q6H_OFywHGMPAGu-JI-jssWQEcZTeBRYKpdEpyrGHOuIlJKiI-q5VwHn4GhxjSDgwLBJxaYyScZN1xiDuxxsKoEm97PHpRQtQgtEu7ijzyOPVRo54BvcrRp_z8A1UzDbjwCjYm_gWymti9_LiMJIpM7GLXPe6AdDFIcseVx9_GzIS2CrGf0wuIksan8OVLNG691YYTCCd7SBB1KzkvW35YQOVlYUkup2HML-IrKy_3CJPaInKsZiVE6DUGr_gLCevxla393J94yaqQw","q":"6MrZF0ocGYJcr05M0bdRupfWwIMi2bF5qF3re6WYMx1TFhad38D15tPpqaNf98cv3tNkQY_SyFLcbB9y0L-xku9QkrM2agbnjji7lv_1NkTfxOHRhcCXpbE6V-_8X_2y53EpXKGQ_BajmwBttYpn3WmbvRXBckogXQtzGhlGccNSX3nPQx2xYqVqz31t1NKu-y5xFPe6dRIu5tXZwygJPjGHFlnB9EZLd6twJBxiB3QwCGJr2jXrKyfOaw4XJbpA2K5EdpsP9kpNReO858tTkW95KkGn0tsl7BNt8Bm-XIVfP26eHYcaMgYRTmHtpd9um0pU-5n_bilZqGdqSn7SrQ","qi":"prvkP-PeRWpr1wxeRSuCZYgINpq-QI3gOZQ62lEIi_9rdpkx5imJmCnFGC0kymKsqfBaL67BK6oU-Hae_DjX5OlOFzX9lKfI_9IyLoQCKRsH6SJQnTApmv7zWbOBcG17EW-rzFj2TSPijWAwbhF7SDWPw9UnZdYjFUBeOBZ1GuDcgu7zWCCigyfn43-jUnI6MDXj8fvNQoqyfaY8-tGW171GfDkOkYz5z6Ufqslg-d3Nctx02OxW_sD4eX9kJ9GPGHIC3DTPHEkdI4G_btvlL5jjtzop98DZD9rd9652c1nPDAm4EhFIPsdOPdGCUkf_doLXf4-5yWjV3LLrC3_RBQ"}';

        // test
        messengerAppData.userData['' + 4] = {};
        messengerAppData.userData['' + 4].privateKey = '{"alg":"RSA-OAEP-256","d":"JI8GZLn5derWP4qXxcv9qk67YCw05b2COXTZYsnvfsHccHvz13n8sQWa7CUp5TNaZUBn2V9AzO3_9quug65ZZJVlyT9YZc-qkCzE8sQkHfRp_tsytNyFZU5_yfWPJukNYoCP1dQwqVsdTG5fXvzSdQW_fpn4PpNNmqLAP2kiiwdACr63K6vjd7oLrjpUEI8x8TQjAO4gvbQU1I7-urE5jBA1Fvwax75-Rk-bFbZgwXdBDqBiBuu4z-iEhoGVAu1sf0dVVYWhvRsFXWOa7Hfk1sD79_emT797KLVU_RSl43WYwQytIDXjsyptfi2xY5jaHUlxxJ2n8ccHase8bwf2r8knAvnEiyQlBX92fmpkGZdV7ruF_ExvQOW0c7Jo0GBxp9MrFyoGSwEXFI1gs5n2Sv1gHQYoe3LrmKZFbT2X-oyLUdrO3HO_f3MJUadkf6yOdc7K9fzAD2wySAKjgZRDHwOUTc_JGcIgU8DOkvyj58NKxN3PiGMZBfXuc4owTfr7SlTawakiMvYz2gR7s1jVu8Gpm4GlEmwToCcEoFh9RsLsQlsiEjHGUU1VWpn8vEq_hmUJ1Tkx_mcPjagjxxeUdGQTZDlyR6UMJuZ6G5yemry-LwYN8vHbICeEzHkjXx0Eyn8VKYr4tbUV9k4elG4Q65kcMRnG0SMBx9d460bML9s","dp":"hbYoSAC-if71LGVcWNM9iLlnr7SYGhZMVelJnxcbnxIGKdslkW9zFSXP2n-MWF2TEQeIMIzSa9XWgx-xbVtZJ1qHKnWn2H84K96L_c9l8JoJAAnBqDiHtx5TB4Xd4uUN4xy_yRmOYYuhfC5zCqQOxjw6iGK2x5ORnKfujK3HVd-_xPJ8fCd2MhHtIeM63ZTITYwHp9JiiObNaNU9zTRPmUa9KvlBrpeg_J_wbj2iEnCrvq93dJwYldFFD8hNxuzAO3v0Eh8t6RoXlpwp84lxtdl7TAep7i-xz9sFOfluCHgeuHzn_bf6zIbjfQy6mnFUgVkcf7dI0jVZue44nfTfGw","dq":"YJ0wbUOlxboDEO1kMhWWyCEs5jEJQZxO5meAfVG8jEEtLjHPmET4FAZIY5GvwjgRB8rToIVd-HWk7UTSilunj-Op1V1VOkyPlrT9oJVslTujy70nCw-k9YBL-RWxGQ4EviAWxpxRj2TMOzsBsb9JHl43lV7vHPqzjTTXAx1LJnuQpLd69hjHuPO3lIrZOwt1ityJftxfbUtpUJWnWrk8nfXo4BtIv-v2MK3P34Md1fY-yBjfYzWACEdrHVwFD5xBoenc0xtRIz6uzojQrLjwdBuztS9h0foV8aLDInToOW-Hn7FGGAPDeSbW1JYkhWmOwYaOVaO0W03IKvBffj7HrQ","e":"AQAB","ext":true,"key_ops":["decrypt"],"kty":"RSA","n":"xdcot-oP33PldTM3EF3tzk-1D7UxEoP30Y9T1sPl7fSBNPij2uB5pz6067K3xClhiT0afh2ToDdm-FnSeZY5PfwY32rhV3Zv995e913ijkuyUjD4FbbYLoC8kRUGV0ky7JqoYLssGKSZf98aobxzPquCURkJFzCs9JUBDL6ANaVGNkdtAoGVQz4Pq2c3Plqh0zV0GwoF-orfDDmb5tgQQwEiWAaMS1KpyCDAjxj2z9tbSO1b4r0fRFEODBKMsE5JF11_r2XBrXgxpG01g527lnjSpVweIYrumKcdsrArS1aDupGLJJoZXhn-TPLf0o6TBcA_NLfgR65CxedQhdvIk3N9rRwerEXr-_ZnuRq--o_PYh_aVkQ1qNo1wvlhedp9DCTWU3tQWpzD0NUgtTam4JhtC3uCAHlENlLNrf0sxzj-bLN6s8QFmuRl55bfR9ItJ7Jfa--lsHN_lt3MbOHJN_VwZD4YOjm-mdTb21C474SNCwA4NM16n6S9UkyekCWymcVB0tyPHO477RdfU3tv_zLnCeYlBg8Kx1M6QOla0OOngNYHpWUHwNoQnWPtvy8hQti1AYk80s7x0-8ydnstOo2exx75fnM5X3OM_UhUIMTNrd6NvFs03lI1AVUo3XhvqZhtWnPFNsBQ2wYE9cfYEjhinRpNG6CD8AFnNoDIXyE","p":"-F1hOB156-ms-f0s-psoIW0bEHNVe79bAj0_oJRTFABMluW5JVZpMkBsMrKrIWHsyp_v7BGjYSlwefB90e600KtWhBKewQlFMLKachjxaLDuwQFEfFGyo1a6PHIgaLwDZZctZbY04w6zOhhjQ8hfynJApurUTTATvKZou2aHfSj4StYYPQisSdzzF0V6XzSnNyNK9OvERD3Vqwbj40EJtlfpjI06Zj2-BO0QMEeDfn4an5p3RLb3Yw9WZnlIH1zUW_HOBhqR_-YAOQcBeIESbnBtR9SRTMiTBkvx9djOIaNeb7C2zXbjFwyAZR2qa9UgTLfXfZm21KYfyfWzdFrKPw","q":"y-wnuh4zbPpAbq538MdEQ6w1a734quCf56X1QW6tOPPb6mxiS3Xz1sM9To6HrNNKaoVtsxFqwHZwcxyCQrOnHh63vB9JGFY5DDk4sABfVNcp9fL_B2SaUYjb2Y9k_PEw06IulrT1IYrr1WJ_5icJsWfI43o1Oj1P_W5M37MUGVE8mfKCR8KkFctnHHbndnMzYk-uLImCMtgZsM8KxVGRewQpiYpe6D6UJbHxbyXJ4-cKfXuE0uiP5v9RpWY9Ev2FNC9p2rOsBgAuiyK0NdXL5taX4DvQ2eRUdQP69tlBVZhbBAweOC283LcInonUIlktQZb15L49Xalkgng6jza-nw","qi":"whSx2dL9lPHTemkK0_Y_XodjHH8KGcSlTD2wo12dUbv_9Sg7F8CbsDvuvNcCAa2nveOwLh_hmbBxjqJSjk-s5sBHAIIn3mKJkbxA9g48z43q6rKO3YwYtfZ4h4-EIsnLbE-foMvyzM1kMHucsvVqyolzSAhPac1cS9oW1cws_4I3Q3-wSHCE860RGWifFW9Z1fuNX163wyyqT-ZLwUWdkexAu4R_yZ3rP_bUMQZNrxNlPh64uilKGfYghf9oXX5Fv_DHZCZvEkhskDYm3gx_etmOjPTNha1Bp9Je_7gH7zYnVBOqzoTnMjrlgR4msMgqAojQ-UxHB8Dm72yocZAuWQ"}';

        localStorage.setItem("messengerAppData", JSON.stringify(messengerAppData));

        console.log("Test users loaded.");

        displayLocalStorage();
    } catch (e) {
        console.log("Exception: " + e);
    }
}

function clearLocalStorage() {
    localStorage.removeItem('messengerAppData');
    displayLocalStorage();
}

function displayLocalStorage() {
    document.getElementById('userData').textContent  = JSON.stringify(JSON.parse(localStorage.getItem('messengerAppData')), undefined, 2);
}