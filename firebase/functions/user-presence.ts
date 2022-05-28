import firestore from '@react-native-firebase/firestore';

export async function ValidateUserPresence(userId: any) {
  try {
    const presence = await firestore()
      .collection('USER_PRESENCE')
      .doc(userId)
      .get();
    return  presence.data()?.online
  } catch (err) {
    console.error(err);
  }
}

export function CreateUserPresenceInstance(userId: any) {
  firestore()
    .collection('USER_PRESENCE')
    .doc(userId)
    .set({
      online: true,
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
}

export function manageUserOnlinePresence(userId: any) {
  firestore()
    .collection('USER_PRESENCE')
    .doc(userId)
    .update({
      online: true,
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
}

export function ManageUseOfflinePresence(userId: any) {
  firestore()
    .collection('USER_PRESENCE')
    .doc(userId)
    .update({
      online: false,
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
}
