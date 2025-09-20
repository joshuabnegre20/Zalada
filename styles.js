import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        flexGrow: 1, // Add this to allow content to grow and scroll
        padding: 20,
        justifyContent: 'flex-start', // Ensure content starts at the top
    },
    boxContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexShrink: 1, // Add this to prevent the container from overflowing
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        color: 'royalblue',
    },
    // Messenger Styles
    contactListContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    contactContainer: {
        alignItems: 'center',
        marginRight: 30,
    },
    profileCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'lightgray',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeProfileCircle: {
        backgroundColor: 'royalblue',
    },
    contactName: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
    latestMessage: {
        fontSize: 12,
        color: 'indianred',
        textAlign: 'center',
    },
    messageListContainer: {
        marginTop: 20,
        // Set a maximum height for the scrollable area
        paddingHorizontal: 10, // Add horizontal padding for messages
    },
    messageContainer: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        maxWidth: '70%',
    },
    sentMessage: {
        backgroundColor: '#DCF8C6', // Light green
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#E8F5FF', // Light blue
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    messageSender: {
        fontSize: 12,
        color: 'gray',
    },
    selectedContactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedContactCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'royalblue',
        marginRight: 10,
    },
    selectedContactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    selectedContactMessageCount: {
        fontSize: 14,
        color: 'indianred',
    },
    // NewsFeed Styles
    newsFeedContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentContainer: {
        backgroundColor: '#f9f9f9',
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
    },
    // Common Styles
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'royalblue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    likeButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        width: 100,
        alignSelf: 'flex-start',
    },
    likeButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default styles;