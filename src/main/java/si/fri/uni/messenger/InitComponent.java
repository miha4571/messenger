package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class InitComponent {

    private static final Logger log = LoggerFactory.getLogger(InitComponent.class);

    private final UserService userService;
    private final MessageService messageService;

    public InitComponent(UserService userService, MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

    @PostConstruct
    private void init() {

        createTestUsers();
        createTestMessages();

    }

    private void createTestUsers() {
        userService.createUser("Franci", "test", "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlIjoiQVFBQiIsImV4dCI6dHJ1ZSwia2V5X29wcyI6WyJlbmNyeXB0Il0sImt0eSI6IlJTQSIsIm4iOiJuVzBPc2pJcF9NajJtYmlTa2trWS13NkdlY1lSLWlGaHZ5Z0VZNlBrU0ZRbHQ2aUJZWTNnTnIxamZacmVXV0VYS01henk3N1lvOVAydmtQbWdVc1pBWG1mVFl0djNpblozejVDVmN1LTlMcmYyN1FMSHVwN010QWI2ZzhVYkRyR2l3eVNJRjZTVUFrai1uZ0NnbTZqdE5aNDdEVzJkMGlUMUhkbmNaS0RKX0NsTzBEN3lHRTczRk1sX3RqLV9ZUFNpWEFGWlp5dDRVSFF0SGw1WjQ3bTZ4alExbmNXa2pfZnBBcVV0U0pYS3RuZlJfLW1wN09jY280Vm1aWkZ0SUV1THhXQ25KMkJmaXJPd2pJT2VIQ2JYcnFzdFBRTE9sTWRiU3NsXy1nb1F2TWNaSnBURl8waFYyR3lPMThOZTA2N014eWVpRGRqczg5QzFhUjJOMThGSWwycmxTZ1dseXNsUFlQS1k1MlB1T1lxenlqb0ZkOVVwN0VJYmVXVFoyemc0bEVrYklfTDJoN2poc0lrRDVweFhrTnhFdDY1STdBU21DQmJhdG9GZXo5QXluYk9IY19UYm56dUw1ZEZqY0tETGM2Z1l4aDF5Q2Zhekxnd3lyNld2N051d21wY3NjVF9sTm40SUNvUzhFWGlqSV9kUFNhOXNhd2tWaVEyZnpRbkdhWE44UVZwLWNWN2FwWlFhcTBMbjJEeU8wTERBVUNXS0ctM0pNamNxbmR0Q3JKbC1mZW9RNkJNOG5hcVREelNnWUFuTUlMcW5TRkRPTm1JSEdXOWhORXo3SzY5anVMaDNXcmo5aHJrTjZxcHJRYUZnT1NxR3Y0N3BNejczdUMtbW9wX1FMcW14S2U3NHVicTVhUHBQSExHZVFYWm5la0loSEtTVkF1X0lwcyJ9");
        userService.createUser("Poldi", "test", "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlIjoiQVFBQiIsImV4dCI6dHJ1ZSwia2V5X29wcyI6WyJlbmNyeXB0Il0sImt0eSI6IlJTQSIsIm4iOiJ1dWtMRTJmcm4wZVo0RmpBa29GdmpDSUdRdzJob20yV2VBMzhFM2lBS2VyVlR0MXpCeHhlSDhNWHlLdWk2SWJ1b2szc05RaVN5ZEgyQ1NDM0thaXpkTmx2Yzk2cWxWSGFwUE9DSVR6alJvcVJiamJIdVl3Z3J1RldBVTFwdEtvOWJaRHRoYVQ5UElzQkVHUGljb1QtUGJpampVYmhjZXBkWk9BTVdpNFktaUlrczNNdmdQeF9VLUVpWmRJN0FfeFNSdjNKNjliWkM0NXZaZzVRZnpNYWpUUTFHcnB0QmdLVHBxNV95TXhBOFRsWUc4LXJ1dXpHaUtTN0N3S0p4TG5FandzR1BfSENpVXZFYnZoaDJWdXJ2QVY1clY5ZFRSWGpPTllRd0lmMXZMcmJLdEhwZUNFOVpaZWVVZzNnUHk5eWU3ckFDVXJ0WHF6OHhLYVlrWGdlQjVCUEM3X21OaUJHRFZkeFFWZk4wNmVRc0ZHc0NBeGZlR0NPMTVkQ2hqaTNlODNrV0xrSzFndGE2ZDNoZnpUMlNfQnR3WmhvN3NUNG9IakIxRlA4aTRTM3g1RTBqY1hrZDg1VDhZRzdwU0xSZzUyUFREaThOelRSZlhXaWRIclZWYzdTM2xqZ1djUGVWdkNzb1ZWZktlRHY3VFR3bVcxaXlGYm9XOTVmaUpjeVh5RDllVjl3dW03MUU5TTNWMGJ5X211MDY0QzJkV0cxVUR1bDhFTmpsemhyUnJOM0Fxdzg0b045OXpDWkJHWEREX0ZBXzNSN0JhMkpqZ2RQaDlzemF5Y3J2MmxMN21rb1VYdm9sbU4ySEFXOE9SOUN6bmdGTFJzYVVFMDluTk1TU1pUal9PUU1lakZ3a3ZDMkUzUnk2dTBpZVNyTW5RcUZ1WFM4YVkyZGpQVSJ9");
        userService.createUser("Micka", "test", "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlIjoiQVFBQiIsImV4dCI6dHJ1ZSwia2V5X29wcyI6WyJlbmNyeXB0Il0sImt0eSI6IlJTQSIsIm4iOiI0N0ZKMEUwRU9HRU1kdUVOTUlfVE1iaVJtb2paWVlQTGN6ZXVCZHk0UjZ6MDNiMGF4VlNrX0VkM0ZyeTlEcTRieGRmTGV5NEV6LUlXdFltdFV2SFd6Mm94Mm9EYmRXNDFkZnpDcTMzaWxmM0dXNWNQcHVtTC16eW5kbzFXemwxODdVTl9xZlB6UEhQUm91VzFQbTRTTHNQVVNveU5hLUdDYzYwRXhpQ3dXWVNNb25MM3JiSDB0Nm54YXd1dkIxWFlxS3M4ZU00TXF0WmpmTDZVejduM0UzRC1Kck5yUE15VHVwWXZDc3R4YVI1VldSNUp0WTRwWHZKS0p1SlRkSTlXaDZRVjVhVHRiRkFkMXJNUWpJZDlrNTB5eF9wNnlvaEFBaXZsTEI2cGtDWHhuTndLdThQNlRVSVpGQ084Ym1YR3RaeFB0OHNfVzQ4RWhMWHJ6QWFBY0U3VlpYeUxlemZRaFZqd2hMN2w3RnZCZVFDZWdFZUxKVFFPRVR3VjA2aFVJMHg3X1diZ2ZaR2NPV0ZNVzRIRnhFbm1yUUxuamFlMFI2OVJuODBmc2FrNzh2WnNDeUVydkUyTUF3VTFmTGs0Ri1qTWdhQUprWVB6YWFOcFp2OWlwb0NjWXVEZWZ5cF9vY2pHcVQwNEJZLUZDdGNCckt4TGdrakNrQmthT2UwazVRcE1wamI0TVVLVjZJUTBGZkZfV1liaURuUzlqanZnRzhvMVNYZ0RMNjVGRGJCTXlDWEpINEE1bV9VMXRueVNLc1QtdTlNeTE3ZXJBdnJMQjA1OFdNdDlQS0NUTWNnZ0lza00telVydFlGRVRUcXVDYTA5cE12ZmhkWUtKcFRZdng2RTB3UHpBdzlSUnNqZ1E2aGQ3MHBWakJYMml0NDJyejRTWldQR0JVYyJ9");
        userService.createUser("test", "test", "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlIjoiQVFBQiIsImV4dCI6dHJ1ZSwia2V5X29wcyI6WyJlbmNyeXB0Il0sImt0eSI6IlJTQSIsIm4iOiJ4ZGNvdC1vUDMzUGxkVE0zRUYzdHprLTFEN1V4RW9QMzBZOVQxc1BsN2ZTQk5QaWoydUI1cHo2MDY3SzN4Q2xoaVQwYWZoMlRvRGRtLUZuU2VaWTVQZndZMzJyaFYzWnY5OTVlOTEzaWprdXlVakQ0RmJiWUxvQzhrUlVHVjBreTdKcW9ZTHNzR0tTWmY5OGFvYnh6UHF1Q1VSa0pGekNzOUpVQkRMNkFOYVZHTmtkdEFvR1ZRejRQcTJjM1BscWgwelYwR3dvRi1vcmZERG1iNXRnUVF3RWlXQWFNUzFLcHlDREFqeGoyejl0YlNPMWI0cjBmUkZFT0RCS01zRTVKRjExX3IyWEJyWGd4cEcwMWc1MjdsbmpTcFZ3ZUlZcnVtS2Nkc3JBclMxYUR1cEdMSkpvWlhobi1UUExmMG82VEJjQV9OTGZnUjY1Q3hlZFFoZHZJazNOOXJSd2VyRVhyLV9abnVScS0tb19QWWhfYVZrUTFxTm8xd3ZsaGVkcDlEQ1RXVTN0UVdwekQwTlVndFRhbTRKaHRDM3VDQUhsRU5sTE5yZjBzeHpqLWJMTjZzOFFGbXVSbDU1YmZSOUl0SjdKZmEtLWxzSE5fbHQzTWJPSEpOX1Z3WkQ0WU9qbS1tZFRiMjFDNDc0U05Dd0E0Tk0xNm42UzlVa3lla0NXeW1jVkIwdHlQSE80NzdSZGZVM3R2X3pMbkNlWWxCZzhLeDFNNlFPbGEwT09uZ05ZSHBXVUh3Tm9RbldQdHZ5OGhRdGkxQVlrODBzN3gwLTh5ZG5zdE9vMmV4eDc1Zm5NNVgzT01fVWhVSU1UTnJkNk52RnMwM2xJMUFWVW8zWGh2cVpodFduUEZOc0JRMndZRTljZllFamhpblJwTkc2Q0Q4QUZuTm9ESVh5RSJ9");
    }

    private void createTestMessages() {
        List<User> users = userService.getUsers();
        User franci = users.get(0);
        User poldi = users.get(1);
        User micka = users.get(2);
        User test = users.get(3);

        messageService.createMessage(franci, micka, "IfS6AiTBlGfwsxd4/p8+ILyWo8XUuo0teiqAtoVCR8XrnnpBhdqEj2nHvCCRl21zLnrQ4ej2Jt3A2SYgerSjGSioJPKLVrz1bN90/ScTXzBSrmDMEs7hMNiDtJkPwGdNFXkq46j0pGssEi5AgWex4tnDkAajEVg0x7FFxwPict3eK+g1RM4khoos7PxF/F6W87ChHbQVdJhdd+HD2CUHjpEGOKFN53vEWIcvU46F/GfTlw4mFAlXlboSy8V8jiaViXHLaZN5lfQ+JlEqGFmhm/E1C/Tq46oGc78Sc8AZ8EyPSsFA1tn7oVE9jd1+d23grhTKcuQVvQa/MC7+so/IpIARiE0zeUh++fQKpLjbhIt5tKayXWHafGwUEaoJdZT4cZ0m8FgVEi5ShDou2dLu7eN9sfypqfdeD0ZizA4laTxim4aLN7DpUONeubuN89h8rrpmpXi2ierNT1nhOdkVKIIV5B/eUhTRll7Vbm5lGGRyIkm9RjkBbRNwiVLVeo7qXghANikSHDHLG7O42j8KBcGLHwCsarcXDw0fGqryNo+aoAt9SYWI267pUCUQPQR25TSkHfRDmLNP8pxILUVf/vHGRO0odwI/oyrCqyuLnkIndPziJjymnXroswtSdxR5QbmGY4WFeD45TylTDVz2gPO7HcS7bovpmTQTmj0REuM=");
        messageService.createMessage(franci, poldi, "UfxZjdsR26PbJjlet/cVt1+Wlb3WOie7DT2lp9579EhRk6Ngo8yV1Gx1UQ3XDanjhu9bIV0yFgL/3xqbZdLqRaawGGMj4tvpXdzy3N3uQzmbKK2SQ78sBP1xzlgkozDADAuL9suWh6Fn3wPTPn/JM/l5qjHGilG6mTrni4Ku0WZhWgqp9wzJ0E+QP+PohPBK9gtTlgnHpXdsrjfEmLtBR44hYUmyKKMGqqs/q9VXugMtA03bXj0g5FjEho9nmdQJ2FiUmZKi68cC4ThTIYtCRgU5/+Cvp9XVaYXblw6yeS1yJHpYYCFcFQ/r1GTiKjgIpycZTp8sAWtefQnv8C7AGbCYdP/QOmSSF6WG8IvP3p3OKzcTw9u4kkuwxw5iacI6E+46QxPO1bw8vF66MmGkIvZLqhk008bwGOJY8fd72PiTuyYUk1CWYUDSAUDCV9WRbCouOS80DJkZuTdtEc8Kj8yxrPF0isY9J/honMi2oZr2dJ6hWiV7YvBmKrcLqTzpzINUpr7Ivpli79szgDVKA6UHUjKrQtUUEgEWHQy9+cnQCGqFBj1ui4Dm1b6Rdg3eju3BRiZOYV7HU8PoLpliapoT8j/1VfO7u6/6Eo3icXi4j45rnvVaHJlwJJqrWzm5bCX3P2UqbVCIja/zTDmK/tmCPGmNJjMKZdb06Osa3lI=");
        messageService.createMessage(poldi, franci, "UiS8Tese+yGZZ3g/8UgMU3wQw3+ySyRpuNavKG3hrAjD9baBYZMZrr0eYYAlnMhru+4XtSDK4LRcUyddc1aCSQ+TZNhob0ZbAJlz7DEcshY9xn6VuCYdSptt8zvOh4TbUnjpw/f92If0vABTRnm+M80RgmK00pgjP2IPLVrNnNirrSXxseV8RbdVN1f9DYjhUzw7SBnqopoo0donHPYhjH6a7tZYaZyutvCh53lDTXPCfj2Spnyf+Y8wIk81NMG1HO+0rkIwX+wWPTQtX1JpaDohQ0/b82oxNbFDKDVvpSlmoK3E6Q2q6J/vz873C3iebCF9Mg3yJOIHDzLCZKlkZz6iQFzH5ZnwZfSiSNo+KFJJGfGZinw4gnvkh9h1FPapaONgDbYApJNuHjz6a2onSlYcZcrmEKwyIoC3cxbaey/l6mkH/x9kWv4cz2khQWEa5AySjXljpDfOYjP1hwSeVvOIHl16uZACkfVh/JBlZboXWfYAgXA53bFp7IuNYWReoNgK13pUkEYrP3xshDiSQLM5rWYJXobL1wsL6PVlStOxxMapZFXDR3AQ9yoHWcb1fqWpeHdsQ8G80ny68cm7nmM9BEiIyrP0sKaSHS1S6vf/sdHiC1SdAT24KB5r+QZsJutpsoAgiXDzWE2raO68XMNs/Qsr58yCQzMWS5cRzIo=");
        messageService.createMessage(test, test, "U/dagGv+Hr0OTQyhN3KTU4mJ3IgFZIMn3v9v5aue1yvAhNoV1voITyqyuJfug+FTv6E+5bsvfCwqqii84iWAIwX5a3mY/rkMYRfipfZpFl3ngKlA280eynAexcuIQQ8saDSdKV5/bnXeIl+Pi/FKW7oJeSRsQ+4TD8cpv1KcbtNbXhHgx2ozqjAyTJcBS5ktfkSIiSsFaI3B+S5u12Xkj1vuVOb07UQdnx8gsXujJoobn7A+vG37i6TlGTPKLMVSJ5jV4ru+3Y8/gmjZm9FjVat0qzh562Ykl1MVbbo4AUHvabBjPnpKXh9r+wbfb0hP3oO8a2DUTLVLbmMxQPAEQb3T/uO+rtu0Ljyq8UxyV+4AUuXlZw/RBsW8YAtCtvOS2fwSS7Ou37s45kmjWfGuUMMFtYP41u1sKfTlBrWjT64Q8EKipuCcmnI4u1JMv44nMtv4hqUWt3lSvmHSFPkAlsr6VFxZXz7kwQUSPyrKL7b3HABPwCuhDEjuLpk3bkyy2CodcUgFLeASBbnVZPg2cbEsCqbqr7KNz+ONfWs+1CydHTTutJQA83ON3bQ3PcuZtq2EHhAdBEaEx3f1f71tmckVBVx7MV2EqLIEtArZEP3tDPDXcFe3o06HAf9QBC+VSxn5qGc1FDv84l3gCg4qXktgTNhYZO2EvjairvcGEpk=");
    }
}
