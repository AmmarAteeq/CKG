package deployment.lifesciencegraph;

import core.ServerNetworkConfiguration;
import core.db.Database.DatabaseIdentifier;
import core.db.configuration.Neo4jDBConfiguration;
import core.server.ServerConfiguration;
import service.ServiceID;
import service.lifesciencegraph.db.LifeScienceGraphNeo4JHandler;

import java.util.logging.Level;

import org.neo4j.driver.SessionConfig;

import com.datastax.oss.driver.api.core.session.Session;

class LifeScienceGraphNetwork extends ServerNetworkConfiguration {

	public enum LifeScienceGraphServerIDs implements ServerID {

		LIFE_SCIENCE_GRAPH_SERVER,

	}

	public enum LifeScienceGraphServerDBIDs implements DatabaseIdentifier {

		LIFE_SCIENCE_GRAPH_NEO4J,

	}

	private final ServerConfiguration lifeScienceGraphServer = new ServerConfiguration(
			LifeScienceGraphServerIDs.LIFE_SCIENCE_GRAPH_SERVER);
	private final Neo4jDBConfiguration neo4j = new Neo4jDBConfiguration(
			LifeScienceGraphServerDBIDs.LIFE_SCIENCE_GRAPH_NEO4J);
	SessionConfig sessionconfig = null;

	public LifeScienceGraphNetwork() {

		lifeScienceGraphServer.httpConfiguration.setAddress("localhost");
		lifeScienceGraphServer.httpConfiguration.setPort(9500);
		lifeScienceGraphServer.httpConfiguration.setServerPath("");

		lifeScienceGraphServer.addService(ServiceID.LIFE_SCIENCE_GRAPH_SERVICE, "graph");
		lifeScienceGraphServer.addServiceDBHandler(ServiceID.LIFE_SCIENCE_GRAPH_SERVICE,
				LifeScienceGraphNeo4JHandler.class, neo4j);

		lifeScienceGraphServer.loggerConfiguration.setDeleteOldLogfiles(true);
		lifeScienceGraphServer.loggerConfiguration.setLoggerName("graph");
		lifeScienceGraphServer.loggerConfiguration.setLogConsole(true);
		lifeScienceGraphServer.loggerConfiguration.setConsoleLogLevel(Level.INFO);
		lifeScienceGraphServer.loggerConfiguration.setLogFile(true);
		lifeScienceGraphServer.loggerConfiguration.setFileLogLevel(Level.FINE);
		lifeScienceGraphServer.loggerConfiguration.setLogFileName("graph");

		lifeScienceGraphServer.ioConfiguration.setBaseDirectory("/Users/ammar.ateeq/Documents/mpa-cloud-server");
		

		lifeScienceGraphServer.threadPoolConfiguration.setThreadPoolSize(5);
		lifeScienceGraphServer.threadPoolConfiguration.setShutdownTimeoutSeconds(2);

		neo4j.setHost("localhost");
		neo4j.setPort(7688);
		neo4j.setNeo4jUser("neo4j");
		neo4j.setNeo4jPassword("123456789");
		//sessionconfig = SessionConfig.defaultConfig();
		System.out.println("Ammar " + neo4j.getDriver().session());
		
		
	}

}
