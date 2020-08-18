package si.fri.uni.messenger;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class MessengerAppApplicationTests {

	@Autowired
	private HelloWorldService helloWorldService;

	@Test
	void contextLoads() {
	}

	@Test
	public void whenApplicationStarts_thenHibernateCreatesInitialRecords() {
		List<HelloWorldMessage> msgs = helloWorldService.getList();
		Assert.assertEquals(msgs.size(), 1);
		Assert.assertNotEquals(msgs.size(), 2);
	}

}
