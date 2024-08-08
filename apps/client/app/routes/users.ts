import { UserModel } from '~/db/mongodb';
import { json, LoaderFunction, ActionFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);
  const userId = url.searchParams.get('id');
  const userEmail = url.searchParams.get('email');

  if (!userId && !userEmail) {
    return json({ error: 'User ID or Email is required' }, { status: 400 });
  }

  try {
    const user = userId
      ? await UserModel.findOne({ id: userId })
      : await UserModel.findOne({ email: userEmail });

    return json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return json({ error: 'Failed to fetch user' }, { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const method = request.method.toUpperCase();
    const user = await request.json();

    if (method === 'POST') {
      const newUser = new UserModel(user);
      await newUser.save();

      return json({ id: newUser.id }, { status: 201 });
    } else if (method === 'PUT') {
      await UserModel.updateOne(
        { id: user.id },
        { $set: user },
        { upsert: true },
      );
      return json({ id: user.id });
    } else {
      return json({ error: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error processing user:', error);
    return json({ error: 'Failed to process user' }, { status: 500 });
  }
};
