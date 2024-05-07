package deployment.lifesciencegraph;

import core.exception.InitializationException;
import core.server.RunServer;
import deployment.lifesciencegraph.LifeScienceGraphNetwork.LifeScienceGraphServerIDs;

public final class LifeScienceGraphStart {

	private LifeScienceGraphStart() {

	}

	/**
	 * Entry point of the Application Deployment: "LifeScienceGraphNetwork", "LIFE_SCIENCE_GRAPH_SERVER"
	 *
	 * @param args, no arguments are passed
	 * @author kay.schallert
	 */
	public static void main(final String[] args) {
		try {
			RunServer.init((new LifeScienceGraphNetwork()).getConfiguration(LifeScienceGraphServerIDs.LIFE_SCIENCE_GRAPH_SERVER));
		} catch (final InitializationException e) {
			System.out.println(e.getErrorMessage());
			System.err.println(e.getErrorMessage());
			System.exit(1);
		} catch (final Exception e) {
			System.out.println("Unexpected Initialization error!");
			System.err.println("Unexpected Initialization error!");
			e.printStackTrace();
//			System.exit(1);
		}

	}

}
